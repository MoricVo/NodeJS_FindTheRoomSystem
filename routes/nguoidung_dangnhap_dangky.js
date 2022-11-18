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
// GET: Đăng ký
router.get('/views_nguoidung_dangky', function(req, res){
	res.render('views_nguoidung_dangky', { title: 'Đăng ký tài khoản cho người dùng!' });
});

// POST: Đăng ký
// var validateForm = [
// 	check('HoVaTen')
// 		.notEmpty().withMessage('Họ và tên không được bỏ trống.'),
// 	check('TenDangNhap')
// 		.notEmpty().withMessage('Tên đăng nhập không được bỏ trống.')
// 		.isLength({ min: 6 }).withMessage('Tên đăng nhập phải lớn hơn 6 ký tự.'),
// 	check('MatKhau')
// 		.notEmpty().withMessage('Mật khẩu không được bỏ trống.')
// 		.custom((value, { req }) => value === req.body.XacNhanMatKhau).withMessage('Xác nhận mật khẩu không đúng.')
// ];
router.post('/views_nguoidung_dangky', upload.single('Anh_ND'),  function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		if(req.file) fs.unlink(req.file.path, function(err){});
		res.render('views_nguoidung_dangky', {
			title: 'Đăng ký tài khoản',
			errors: errors.array()
		});
	} else {
		var fileName = '';
		if(req.file) fileName = req.file.filename;
		var data = {
			LoaiNguoiDung_ND:req.body.LoaiNguoiDung_ND,
			TenDN_ND: req.body.TenDN_ND,
            MK_ND:bcrypt.hashSync(req.body.MK_ND, saltRounds),
			Ten_ND: req.body.Ten_ND,
            NgaySinh_ND:req.body.NgaySinh_ND,
			Anh_ND: fileName,
            Email_ND:req.body.Email_ND,
            DienThoai_ND:req.body.DienThoai_ND,
			DiaChi_ND:req.body.DienThoai_ND,
            CMND_ND:req.body.CMND_ND,
			
		};
		var sql = 'INSERT INTO tbl_nguoidung SET ?';
		conn.query(sql, data, function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				req.session.success = 'Đã đăng ký tài khoản người dùng thành thụ.';
				res.redirect('/success');
			}
		});
	}
});
router.get('/dangnhap_admin', function(req, res){
	res.render('admin/dangnhap_admin', { title: 'Đăng nhập tài khoản để sử dụng!' });
});
// POST: Đăng nhập
router.post('/dangnhap_admin', function(req, res){
	if(req.session.ID_ND){
		req.session.error = 'Người dùng đã đăng nhập rồi.';
		res.redirect('/error');
	} else {
		var sql = "SELECT * FROM tbl_nguoidung WHERE TenDN_ND = ?";
		conn.query(sql, [req.body.TenDN_ND], function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else if(results.length > 0){
				var tk = results[0];
				if(bcrypt.compareSync(req.body.MK_ND, tk.MK_ND)){
					if(tk.KichHoat_ND == 0){
						req.session.error = 'Người dùng đã bị khóa tài khoản.';
						res.redirect('/error');
					} else {
						// Đăng ký session
						req.session.ID_ND = tk.ID_ND;
						req.session.Ten_ND = tk.Ten_ND;
						req.session.LoaiNguoiDung_ND = tk.LoaiNguoiDung_ND;
						req.session.Anh_ND = tk.Anh_ND;
						
						res.redirect('/admin');
					}
				} else {
					req.session.error = 'Mật khẩu không đúng.';
					res.redirect('/error');
				}
			} else {
				req.session.error = 'Tên đăng nhập không tồn tại.';
				res.redirect('/error');
			}
		});
	}
});
// GET: Đăng xuất
router.get('/dangxuat', function(req, res){
	if(req.session.ID_ND){
		delete req.session.ID_ND;
		delete req.session.Ten_ND;
		delete req.session.LoaiNguoiDung_ND;
		
		res.redirect('/admin');
	} else {
		req.session.error = 'Người dùng chưa đăng nhập.';
		res.redirect('/error');
	}
});


router.get('/dangnhap_nguoidung', function(req, res){
	res.render('dangnhap_nguoidung', { title: 'Đăng nhập tài khoản để sử dụng!', error:"" });
});

router.post('/dangky_nguoidung',  function(req, res){
	var sql = "SELECT * FROM tbl_nguoidung WHERE Email_ND = ? ";
	conn.query(sql, [req.body.Email_ND], function(error, results){
		if(error){
		}else if(results.length>0){
			req.session.error = 'Email này đã được sử dụng.';
			res.redirect('back');
		}else{
			var data = {
				LoaiNguoiDung_ND: 'khachhang',
				MK_ND:bcrypt.hashSync(req.body.MK_ND, saltRounds),
				Ten_ND: req.body.Ten_ND,
				Email_ND:req.body.Email_ND,
				DienThoai_ND:req.body.DienThoai_ND,
			};
			var sql = 'INSERT INTO tbl_nguoidung SET ?';
			conn.query(sql, data, function(error, results){
				if(error) {
					req.session.error = error;
					res.redirect('/error');
				} else {
					req.session.sc = 'Chúc mừng bạn đã đăng ký tài khoản thành công!';
					res.redirect('/');
				}
			});
		}
	});
		
	
});
router.post('/dangnhap_nguoidung', function(req, res){
	if(req.session.ID_ND){
		req.session.error = 'Người dùng đã đăng nhập rồi.';
		res.redirect('back');
	} else {
		var sql = "SELECT * FROM tbl_nguoidung WHERE Email_ND = ? ";
		conn.query(sql, [req.body.Email_ND], function(error, results){
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
						res.redirect('/');
					}
				} else {
					req.session.error = 'Mật khẩu không đúng.';
					res.redirect('back');
				}
			} else {
				req.session.error = 'Email không tồn tại.';
				res.redirect('back');
			}
		});
	}
});

router.get('/dangxuat_nguoidung', function(req, res){
	if(req.session.ID_ND){
		delete req.session.ID_ND;
		delete req.session.Ten_ND;
		delete req.session.LoaiNguoiDung_ND;
		
		res.redirect('/');
	} else {
		req.session.error = 'Người dùng chưa đăng nhập.';
		res.redirect('/error');
	}
});



module.exports = router;

