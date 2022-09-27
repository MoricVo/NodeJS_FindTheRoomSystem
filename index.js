//Khai bao import thu vien express ho tro NodeJS
var express = require('express');
//Gan bien tinh app de dung
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var { get } = require('express/lib/response');

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Quy định thư mục chứa views.
app.set('views', './views');
//Quy định template engine là ejs.
app.set('view engine', 'ejs');
//Quy định khi đọc phần body của request gởi lên server.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(session({
	name: 'FindRoomSystem',						// Tên session
	secret: 'Black cat eat black mouse',// Khóa bảo vệ
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 30 * 86400000			// 30 * (24 * 60 * 60 * 1000) - Hết hạn sau 30 ngày
	}
}));
app.use(function(req, res, next){
	res.locals.session = req.session;
	
	// Lấy thông báo của trang trước đó (nếu có)
	var error = req.session.error;
	var success = req.session.success;
	
	delete req.session.error;
	delete req.session.success;
	
	res.locals.errorMsg = '';
	res.locals.successMsg = '';
	
	if (error) res.locals.errorMsg = error;
	if (success) res.locals.successMsg = success;
	
	next();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', indexRouter);
app.use('/', authRouter);
// app.get('/',function(req,res)
// {
//        res.send('Trang chủ')
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, function(){
	console.log('HỆ THỐNG ĐANG CHẠY...!');
	console.log('AI ĐỌC DÒNG NÀY ỈA CHẢY 3 NGÀY 3 ĐÊM...!');
});


