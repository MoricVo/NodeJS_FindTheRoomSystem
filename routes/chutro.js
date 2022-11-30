var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var conn = require('../connect');
var { check, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var multer = require('multer');
var storageConfig = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, 'uploads/');
	},
	filename: function(req, file, callback){
		var timestamp = Date.now();
		callback(null, timestamp + path.extname(file.originalname));
	}
});
var storageConfig_nt = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, 'uploads/nhatro/');
	},
	filename: function(req, file, callback){
		var timestamp = Date.now();
		callback(null, timestamp + path.extname(file.originalname));
	}
});
var upload = multer({ storage: storageConfig });
var upload_nt = multer({ storage: storageConfig_nt });
router.get('/', function(req, res){
	res.render('chutro/index_chutro', { title: '' });
});
function numberFormat(num){
	var n = new Intl.NumberFormat('en-US');
	var output = n.format(num);
	return output;
}
function formatDate(date){
	let day=date.getDate();
	let month=date.getMonth()+1;
	let year=date.getFullYear();
	return day+" thg "+month+", "+year;
}

router.get('/dangky_chutro', function(req, res){
	res.render('chutro/dangnhap_chutro', { title: 'Đăng nhập tài khoản để sử dụng!' });
});
router.post('/dangky_chutro', upload.single('Anh_ND'),  function(req, res){
	var sql = "SELECT * FROM tbl_nguoidung WHERE TenDN_ND = ? ";
	conn.query(sql, [req.body.TenDN_ND], function(error, results){
		if(results.length>0){
			req.session.error = 'Tên đăng nhập này đã được sử dụng.';
			res.redirect('back');
		}else{
			var sql = "SELECT * FROM tbl_nguoidung WHERE Email_ND = ? ";
			conn.query(sql, [req.body.Email_ND], function(error, results){
			if(results.length>0){
				req.session.error = 'Email này đã được sử dụng.';
				res.redirect('back');
			}else{
				var errors = validationResult(req);
				if(!errors.isEmpty()) {
					if(req.file) fs.unlink(req.file.path, function(err){});
					res.render('/chutro/dangnhap_chutro', {
						title: 'Đăng ký tài khoản',
						errors: errors.array()
					});
				} else {
					var fileName = '';
						if(req.file) fileName = req.file.filename;
						var data = {
							LoaiNguoiDung_ND: 'chutro',
							TenDN_ND: req.body.TenDN_ND,
							MK_ND:bcrypt.hashSync(req.body.MK_ND, saltRounds),
							Ten_ND: req.body.Ten_ND,
							NgaySinh_ND:req.body.NgaySinh_ND,
							Anh_ND: fileName,
							Email_ND:req.body.Email_ND,
							DienThoai_ND:req.body.DienThoai_ND,
							DiaChi_ND:req.body.DienThoai_ND,
							CMND_ND:req.body.CMND_ND,
							KichHoat_ND: 0
						};
						var sql = 'INSERT INTO tbl_nguoidung SET ?';
						conn.query(sql, data, function(error, results){
							if(error) {
								req.session.error = error;
								res.redirect('/error');
							} else {
								req.session.success = 'Đăng ký tài khoản thành công! vui lòng đợi Quản trị viên kiểm duyệt';
								res.redirect('back');
							}
						});
				}
			}
			});
		}
	});

	
});

router.post('/dangnhap_chutro', function(req, res){
		var sql = "SELECT * FROM tbl_nguoidung WHERE LoaiNguoiDung_ND = '"+req.body.LoaiNguoiDung_ND +"' AND TenDN_ND = ?";
		conn.query(sql, [req.body.TenDN_ND], function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else if(results.length > 0){
				var tk = results[0];
				if(bcrypt.compareSync(req.body.MK_ND, tk.MK_ND)){
					if(tk.KichHoat_ND == 0){
						req.session.error = 'Người dùng đã bị khóa tài khoản.';
						res.redirect('back');
					} else {
						// Đăng ký session
						req.session.ID_ND = tk.ID_ND;
						req.session.Ten_ND = tk.Ten_ND;
						req.session.LoaiNguoiDung_ND = tk.LoaiNguoiDung_ND;
						req.session.Anh_ND = tk.Anh_ND;
						
						req.session.sc = "Đăng nhập thành công!";
						res.redirect('/chutro');
					}
				} else {
					req.session.error = 'Mật khẩu không đúng.';
					res.redirect('back');
				}
			} else {
				req.session.error = 'Tên đăng nhập không tồn tại.';
				res.redirect('back');
			}
		});
	
});
router.get('/dangxuat_chutro', function(req, res){
	if(req.session.ID_ND){
		delete req.session.ID_ND;
		delete req.session.Ten_ND;
		delete req.session.LoaiNguoiDung_ND;
		
		res.redirect('/chutro/dangky_chutro');
	} else {
		req.session.error = 'Người dùng chưa đăng nhập.';
		res.redirect('/chutro/dangky_chutro');
	}
});

//GET Nhà trọ của tôi
router.get('/nhatro_cuatoi', function(req, res){
    var sql = 'SELECT * FROM tbl_nhatro WHERE ID_ChuTro_NT = ?';
	conn.query(sql, [req.session.ID_ND], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('chutro/nhatro_cuatoi', {
				title: 'Danh sách nhà trọ',
				NhaTro: results,
                numberFormat
			});
		}
	});
});
router.get('/get_data', function(req, res, next){
	var type = req.query.type;
	var search_query = req.query.parent_value;
	if(type == 'load_district'){
		var sql = 'SELECT * FROM district WHERE _province_id = ' + search_query +' ORDER BY _name ASC';
	}
	if(type == 'load_ward'){
		var sql = 'SELECT * FROM ward WHERE _district_id = ' + search_query +' ORDER BY _name ASC';
	}
	conn.query(sql, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			/*var data_arr = [];
				results.forEach(function(row) {
					data_arr.push(row.Data)
			});*/
			res.json(results);
		}
	});
});
//GET: đăng ký trọ
router.get('/dangky_nhatro', function(req, res){
	var sql = 'SELECT * FROM province';
	conn.query(sql, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('chutro/dangky_nhatro', {
				title: 'Đăng ký nhà trọ',
				Provinces: results,
			});
		}
	});	
});


//POST: đăng ký Nhà trọ
router.post("/dangky_nhatro", upload_nt.single('image'), function (req, res) {
	var errors = validationResult(req);
	var Wifi=0, TV=0, ChoDeXe=0, TuLanh=0, MayLanh=0, BepNauAn=0;
	if(req.body.Wifi_NT){
		Wifi=1;
	}if(req.body.TV_NT){
		TV=1;
	}if(req.body.ChoDeXe_NT){
		ChoDeXe=1;
	}if(req.body.MayLanh_NT){
		MayLanh=1;
	}if(req.body.TuLanh_NT){
		TuLanh=1;
	}if(req.body.BepNauAn_NT){
		BepNauAn=1;
	}
	if(!errors.isEmpty()) {
		res.render('/', {
			title: '',
			errors: errors.array()
			
		});
		if(req.file) fs.unlink(req.file.path, function(err){});
	} else {
		var fileName = '';
			if(req.file) fileName = req.file.filename;
		if(req.session.ID_ND!=null) {
			
			var data = {
				TenNhaTro_NT: req.body.TenNhaTro_NT,
				ID_ChuTro_NT: req.session.ID_ND,
				DiaChi_NT: req.body.DiaChi_NT,
				SoDienThoai_NT: req.body.SoDienThoai_NT,
				ThongTin_NT: req.body.ThongTin_NT,
				Gia_NT: req.body.Gia_NT,
				SoLuongPhong_NT: req.body.SoLuongPhong_NT,
				KhuVuc_NT: req.body.province,
				Anh_NT: fileName,
				Wifi_NT: Wifi,
				TV_NT: TV,
				ChoDeXe_NT: ChoDeXe,
				TuLanh_NT: TuLanh,
				MayLanh_NT: MayLanh,
				BepNauAn_NT: BepNauAn,
				Lat_NT: req.body.lat,
				Lng_NT: req.body.lng,
				
			};
			var sql = 'INSERT INTO tbl_nhatro SET ?';
			conn.query(sql, data, function(error, results){
				if(error) {
					req.session.error = error;
					res.redirect('/error');
				} else {
					req.session.sc = 'Đăng ký trọ thành công và đang chờ kiểm duyệt.';
					res.redirect('/chutro/nhatro_cuatoi');
				}
			});
		} else {
			res.render('chutro/dangnhap_chutro');
		}
	}
});
//GET: nhà trọ sửa
router.get("/nhatro_sua/:id", function (req, res) {
	var id = req.params.id;
	var sql = "SELECT * FROM tbl_nhatro WHERE ID_NT = ?;\
	SELECT * FROM province";
	conn.query(sql, [id], function (error, results) {
	  if (error) {
		req.session.error = error;
		res.redirect("/error");
	  } else {
		res.render("chutro/nhatro_sua", {
		  title: "Sửa thông tin trọ",
		  nt: results[0].shift(),
		  Provinces: results[1]
		});
	  }
	});
});
//GET: bài đăng của tôi
router.get('/baidang_cuatoi', function(req, res){
    var sql = 'SELECT * FROM tbl_baidang WHERE ID_NguoiDang_BD = ?';
	conn.query(sql, [req.session.ID_ND], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('chutro/baidang_cuatoi', {
				title: 'Danh sách bài đăng của '+req.session.Ten_ND,
				BaiDang: results,
                numberFormat,
				formatDate
			});
		}
	});
});
//POST: sửa Nhà trọ
router.post("/nhatro_sua/:id", function (req, res) {
	var errors = validationResult(req);
	var Wifi=0, TV=0, ChoDeXe=0, TuLanh=0, MayLanh=0, BepNauAn=0;
	if(req.body.Wifi_NT){
		Wifi=1;
	}if(req.body.TV_NT){
		TV=1;
	}if(req.body.ChoDeXe_NT){
		ChoDeXe=1;
	}if(req.body.MayLanh_NT){
		MayLanh=1;
	}if(req.body.TuLanh_NT){
		TuLanh=1;
	}if(req.body.BepNauAn_NT){
		BepNauAn=1;
	}
	if(!errors.isEmpty()) {
		res.render('/', {
			title: '',
			errors: errors.array()
		});
		if(req.file) fs.unlink(req.file.path, function(err){});
	} else {
		if(req.session.ID_ND!=null) {
			var data = {
				TenNhaTro_NT: req.body.TenNhaTro_NT,
				ID_ChuTro_NT: req.session.ID_ND,
				DiaChi_NT: req.body.DiaChi_NT,
				SoDienThoai_NT: req.body.SoDienThoai_NT,
				ThongTin_NT: req.body.ThongTin_NT,
				Gia_NT: req.body.Gia_NT,
				SoLuongPhong_NT: req.body.SoLuongPhong_NT,
				KhuVuc_NT: req.body.province,
				Wifi_NT: Wifi,
				TV_NT: TV,
				ChoDeXe_NT: ChoDeXe,
				TuLanh_NT: TuLanh,
				MayLanh_NT: MayLanh,
				BepNauAn_NT: BepNauAn,
				KiemDuyet_NT: 0
			};
			var sql = 'UPDATE tbl_nhatro SET ? WHERE ID_NT = ?';
			conn.query(sql, [data,req.params.id], function(error, results){
				if(error) {
					req.session.error = error;
					res.redirect('/error');
				} else {
					req.session.sc = 'Cập nhật trọ thành công và đang chờ kiểm duyệt lại.';
					res.redirect('/chutro/nhatro_cuatoi');
				}
			});
		} else {
			res.render('chutro/dangnhap_chutro');
		}
	}
});

//POST bài đăng
router.get('/baidang_them', function(req, res){
	res.render('chutro/baidang_them', { title: 'Tạo bài đăng' });
});
router.post("/baidang_them", function (req, res) {
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		res.render('/', {
			title: '',
			errors: errors.array()
		});
	} else {
		if(req.session.ID_ND!=null) {
			var data = {
				TieuDe_BD: req.body.TieuDe_BD,
				TomTat_BD: req.body.TomTat_BD,
				NoiDung_BD: req.body.NoiDung_BD,
				ID_NguoiDang_BD: req.session.ID_ND
			};
			var sql = 'INSERT INTO tbl_baidang SET ?';
			conn.query(sql, data, function(error, results){
				if(error) {
					req.session.error = error;
					res.redirect('/error');
				} else {
					req.session.sc = 'Tạo bài đăng thành công và đang chờ kiểm duyệt.';
					res.redirect('/chutro/baidang_cuatoi');
				}
			});
		} else {
			res.render('chutro/dangnhap_chutro');
		}
	}
});
//Xóa bài đăng
router.get("/baidang_xoa/:id", function (req, res) {
	var id = req.params.id;
	var sql = "DELETE FROM tbl_baidang WHERE ID_BD = ?";
	conn.query(sql, [id], function (error, results) {
	  if (error) {
		req.session.error = error;
		res.redirect("/error");
	  } else {
		res.redirect("back");
	  }
	});
});

// GET: Sửa tài khoản
router.get("/baidang_sua/:id", function (req, res) {
	var id = req.params.id;
	var sql = "SELECT * FROM tbl_baidang WHERE ID_BD = ?";
	conn.query(sql, [id], function (error, results) {
	  if (error) {
		req.session.error = error;
		res.redirect("/error");
	  } else {
		res.render("chutro/baidang_sua", {
		  title: "Sửa bài đăng",
		  BaiDang: results.shift(),
		});
	  }
	});
});
router.post("/baidang_sua/:id", upload.single("Anh_BD"), function (req, res) {
	
	var baidang = {
	TieuDe_BD: req.body.TieuDe_BD,
	NoiDung_BD: req.body.NoiDung_BD,
	NgayCapNhat_BD: null,
	KiemDuyet_BD: 0,
	};
	var id = req.params.id;
	var sql = "UPDATE tbl_baidang SET ? WHERE ID_BD = ?";
	conn.query(sql, [baidang, id], function (error, results) {
	if (error) {
		req.session.error = error;
		res.redirect("/error");
	} else {
		req.session.sc = 'Sửa bài đăng thành công, chờ kiểm duyệt.';
		res.redirect("/chutro/baidang_cuatoi");
	}
	});

});

//GET Phòng trọ
router.get('/phongtro/:id_nhatro', function(req, res){
	var sql = 'SELECT * FROM tbl_phongtro WHERE ID_NhaTro_PT = ?;\
	SELECT SoLuongPhong_NT, ID_NT FROM tbl_nhatro WHERE ID_NT = ' + req.params.id_nhatro;
	conn.query(sql, [req.params.id_nhatro], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('chutro/phongtro', {
				title: 'Danh sách phòng trọ ',
				Phong: results[0],
				nt: results[1].shift()
			});
		}
	});
});
router.get('/phongtro_them/:id_nhatro/:soluong', function(req, res){
	var sql = 'DELETE FROM tbl_phongtro WHERE ID_NhaTro_PT = ?';
	conn.query(sql, req.params.id_nhatro, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			var sql = 'INSERT INTO tbl_phongtro SET ?';
			var data;
			for(var i=1; i<= req.params.soluong; i++){
				data = {
					ID_NhaTro_PT: req.params.id_nhatro,
					MaSo_PT: '0'+i,
					TinhTrang_PT: 0
				};
				conn.query(sql, data, function(error, results){
					if(error) {
						req.session.error = error;
						res.redirect('/error');
					} 
				});
			}
		}
	});
	
	req.session.sc = 'Đã tạo phòng trọ tự động chỉ khi xóa hết mới được tạo lại.';
	res.redirect("back");
	
});
// GET: SỬa tình trạng phòng
router.get("/tinhtrangphong/:id_nhatro/:id", function (req, res) {
	var id = req.params.id;
	var id_nhatro = req.params.id_nhatro;
	var sql =
	  "UPDATE tbl_phongtro SET TinhTrang_PT = 1 - TinhTrang_PT WHERE ID_PT = ?";
	conn.query(sql, [id], function (error, results) {
	  if (error) {
		req.session.error = error;
		res.redirect("/error");
	  } else {
		var sql ="UPDATE tbl_nhatro SET SoLuongHienTai_NT = (SELECT COUNT(*) FROM tbl_phongtro WHERE TinhTrang_PT = 1 AND ID_NhaTro_PT = ?) WHERE ID_NT = ?";
		conn.query(sql, [id_nhatro, id_nhatro], function (error, results) {});
		res.redirect("back");
	  }
	});
  });
  

module.exports = router;