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
router.get('/dangkyadmin', function(req, res){
	res.render('dangkyadmin', { title: 'Đăng ký tài khoản' });
});

var validateForm = [
	check('HoVaTen')
		.notEmpty().withMessage('Họ và tên không được bỏ trống.'),
	check('TenDangNhap')
		.notEmpty().withMessage('Tên đăng nhập không được bỏ trống.')
		.isLength({ min: 6 }).withMessage('Tên đăng nhập phải lớn hơn 6 ký tự.'),
	check('MatKhau')
		.notEmpty().withMessage('Mật khẩu không được bỏ trống.')
		.custom((value, { req }) => value === req.body.XacNhanMatKhau).withMessage('Xác nhận mật khẩu không đúng.')
];
router.post('/dangky', upload.single('HinhAnh'), validateForm, function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		if(req.file) fs.unlink(req.file.path, function(err){});
		res.render('dangky', {
			title: 'Đăng ký tài khoản',
			errors: errors.array()
		});
	} else {
		var fileName = '';
		if(req.file) fileName = req.file.filename;
		var data = {
			HoVaTen: req.body.HoVaTen,
			Email: req.body.Email,
			HinhAnh: fileName,
			TenDangNhap: req.body.TenDangNhap,
			MatKhau: bcrypt.hashSync(req.body.MatKhau, saltRounds)
		};
		var sql = 'INSERT INTO taikhoan SET ?';
		conn.query(sql, data, function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				req.session.success = 'Đã đăng ký tài khoản thành công.';
				res.redirect('/success');
			}
		});
	}
});

module.exports = router;