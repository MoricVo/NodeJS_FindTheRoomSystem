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
// GET: Thêm tài khoản
router.get('/them', function(req, res){
	res.render('admin/admin_them', { title: 'Đăng ký tài khoản' });
});

var validateForm = [
	check('HoTen_AD')
		.notEmpty().withMessage('Họ và tên không được bỏ trống.'),
	check('TenDangNhap_AD')
		.notEmpty().withMessage('Tên đăng nhập không được bỏ trống.')
		.isLength({ min: 6 }).withMessage('Tên đăng nhập phải lớn hơn 6 ký tự.'),
	check('MatKhau_AD')
		.notEmpty().withMessage('Mật khẩu không được bỏ trống.')
		// .custom((value, { req }) => value === req.body.XacNhanMatKhau).withMessage('Xác nhận mật khẩu không đúng.')
];
router.post('/them', upload.single('AnhDaiDien_AD'), validateForm, function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		if(req.file) fs.unlink(req.file.path, function(err){});
		res.render('views_them_admin', {
			title: 'Đăng ký tài khoản',
			errors: errors.array()
		});
	} else {
		var fileName = '';
		if(req.file) fileName = req.file.filename;
		var data = {
			TenDangNhap_AD: req.body.TenDangNhap_AD,
			MatKhau_AD: bcrypt.hashSync(req.body.MatKhau_AD, saltRounds),
			HoTen_AD: req.body.HoTen_AD,
			GioiTinh: req.body.GioiTinh,
			Email_AD: req.body.Email_AD,
			DienThoai_AD: req.body.DienThoai_AD,
			AnhDaiDien_AD: fileName,
			
			
		};
		var sql = 'INSERT INTO tbl_admin SET ?';
		conn.query(sql, data, function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				req.session.success = 'Đã đăng ký tài khoản thành công.';
				res.redirect('/views_danhsach_admin');
				// res.redirect('/success');
			}
		});
	}
});

// GET: Sửa tài khoản
router.get('/sua/:id', function(req, res){
	var id = req.params.id;
	var sql = 'SELECT * FROM tbl_admin WHERE ID_AD = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('views_sua_admin', {
				title: 'Sửa tài khoản',
				/*ID: results[0].ID,
				HoVaTen: results[0].HoVaTen,
				Email: results[0].Email,
				HinhAnh: results[0].HinhAnh,
				TenDangNhap: results[0].TenDangNhap,
				MatKhau: results[0].MatKhau,
				QuyenHan: results[0].QuyenHan,
				KichHoat: results[0].KichHoat,*/
				tbl_admin: results[0]
			});
		}
	});
});
router.post('/sua/:id', upload.single('AnhDaiDien_AD'), validateForm, function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		if(req.file) fs.unlink(req.file.path, function(err){});
		res.render('views_sua_admin', {
			title: 'Sửa tài khoản quản trị viên',
			ID: req.params.id,
			TenDangNhap_AD: req.body.TenDangNhap_AD,
			MatKhau_AD: req.body.MatKhau_AD,
			HoTen_AD: req.body.HoTen_AD,
		    GioiTinh: req.body.GioiTinh,
			Email_AD: req.body.Email_AD,
			DienThoai_AD: req.body.DienThoai_AD,
			AnhDaiDien_AD: req.body.AnhDaiDien_AD,
			errors: errors.array()
		});
	} else {
		var admin = {
			TenDangNhap_AD: req.body.TenDangNhap_AD,
			HoTen_AD: req.body.HoTen_AD,
		    GioiTinh: req.body.GioiTinh,
			Email_AD: req.body.Email_AD,
			DienThoai_AD: req.body.DienThoai_AD,
			
		};
		if(req.body.MatKhau_AD)
			admin['MatKhau_AD'] = bcrypt.hashSync(req.body.MatKhau_AD, saltRounds);
		if(req.file){
			admin['AnhDaiDien_AD'] = req.file.filename;
		}
		var id = req.params.id;
		var sql = 'UPDATE tbl_admin SET ? WHERE ID_AD = ?';
		conn.query(sql, [admin, id], function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				res.redirect('/views_danhsach_admin');
			}
		});
	}
});

// GET: Danh sách tài khoản
router.get('/admin_tk', function(req, res){
	var sql = "SELECT * FROM tbl_admin";
	conn.query(sql, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('admin/admin_danhsach', {
				title: 'Danh sách tài khoản',
				tbl_admin: results
			});
		}
	});
});

// GET: Xóa tài khoản
router.get('/xoa/:id', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM tbl_admin WHERE ID_AD = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.redirect('/views_danhsach_admin');
		}
	});
});
module.exports = router;