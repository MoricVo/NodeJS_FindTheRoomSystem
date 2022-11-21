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
var upload = multer({ storage: storageConfig });
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
	var sql = 'SELECT * FROM province;\
		SELECT * FROM tbl_tienich';
	conn.query(sql, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('chutro/dangky_nhatro', {
				title: 'Đăng ký nhà trọ',
				Provinces: results[0],
				TienIch: results[1]
			});
		}
	});	
});






var validateForm = [
	check('hovaten')
		.notEmpty().withMessage('Họ và tên không được bỏ trống.'),
	check('tendangnhap')
		.notEmpty().withMessage('Tên đăng nhập không được bỏ trống.')
		.isLength({ min: 6 }).withMessage('Tên đăng nhập phải lớn hơn 6 ký tự.'),
	check('matkhau')
		.notEmpty().withMessage('Mật khẩu không được bỏ trống.')
];
//POST: đăng ký Nhà trọ
router.post("/dangky_nhatro", function (req, res) {
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		res.render('/', {
			title: '',
			errors: errors.array()
		});
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
module.exports = router;