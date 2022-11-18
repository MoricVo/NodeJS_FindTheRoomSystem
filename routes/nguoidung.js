var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var conn = require('../connect');
var { check, validationResult } = require('express-validator');
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


router.get('/',function (req,res)
{
	var sql ='select * from tbl_nguoidung' ;
	conn.query(sql,function(error,results) {
	if(error){
		res.send(error);
	}
	else{
		res.render('admin/nguoidung_danhsach',{
			title:"Danh sách người dùng!",
			tbl_nguoidung:results
		});
	}
	});
});


// GET: Sửa tài khoản
router.get('/sua/:id', function(req, res){
	var id = req.params.id;
	var sql = 'SELECT * FROM tbl_nguoidung WHERE ID_ND = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('admin/nguoidung_sua', {
				title: 'Sửa tài khoản người dùng',
				/*ID: results[0].ID,
				HoVaTen: results[0].HoVaTen,
				Email: results[0].Email,
				HinhAnh: results[0].HinhAnh,
				TenDangNhap: results[0].TenDangNhap,
				MatKhau: results[0].MatKhau,
				QuyenHan: results[0].QuyenHan,
				KichHoat: results[0].KichHoat,*/
				tbl_nguoidung: results[0]
			});
		}
	});
});

router.post('/sua/:id', upload.single('Anh_ND'), function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		if(req.file) fs.unlink(req.file.path, function(err){});
		res.render('views_nguoidung_sua', {
			title: 'Sửa tài khoản người dùng',
			ID_ND: req.params.id,
			Ten_ND: req.body.Ten_ND,
			TenDN_ND: req.body.TenDN_ND,
			MK_ND: req.body.MK_ND,
			NgaySinh_ND: req.body.NgaySinh_ND,
			Anh_ND: req.body.Anh_ND,
			LoaiNguoiDung_ND: req.body.LoaiNguoiDung_ND,
			Email_ND: req.body.Email_ND,
			DienThoai_ND:req.body.DienThoai_ND,
			DiaChi_ND:req.body.DiaChi_ND,
			CMND_ND:req.body.CMND_ND,
			KichHoat_ND:req.body.KichHoat_ND,
			NgayDang_ND:req.body.NgayDang_ND,
			errors: errors.array()
		});
	} else {
		var taikhoan = {
			Ten_ND: req.body.Ten_ND,
			TenDN_ND: req.body.TenDN_ND,
		
			NgaySinh_ND: req.body.NgaySinh_ND,
			
			LoaiNguoiDung_ND: req.body.LoaiNguoiDung_ND,
			Email_ND: req.body.Email_ND,
			DienThoai_ND:req.body.DienThoai_ND,
			DiaChi_ND:req.body.DiaChi_ND,
			CMND_ND:req.body.CMND_ND,
			KichHoat_ND:req.body.KichHoat_ND,
			NgayDang_ND:req.body.NgayDang_ND,
		};
		if(req.body.MatKhau)
			taikhoan['MK_ND'] = bcrypt.hashSync(req.body.MK_ND, saltRounds);
		if(req.file){
			taikhoan['Anh_ND'] = req.file.filename;
		}
		var id = req.params.id;
		var sql = 'UPDATE tbl_nguoidung SET ? WHERE ID_ND = ?';
		conn.query(sql, [taikhoan, id], function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				res.redirect('/nguoidung');
			}
		});
	}
});

//GET: Xóa tài khoản
router.get('/xoa/:id', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM tbl_nguoidung WHERE ID_ND = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.redirect('back');
		
		}
	});
});

// GET: Duyệt bài viết
router.get("/duyet/:id", function (req, res) {
	var id = req.params.id;
	var sql =
	  "UPDATE tbl_nguoidung SET KichHoat_ND = 1 - KichHoat_ND WHERE ID_ND = ?";
	conn.query(sql, [id], function (error, results) {
	  if (error) {
		req.session.error = error;
		res.redirect("/error");
	  } else {
		res.redirect("back");
	  }
	});
  });
module.exports = router;