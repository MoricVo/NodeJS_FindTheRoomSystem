var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();
var conn = require('../connect');
router.get('/',function(req,res)
{
       res.render('index',{title:'Trang chủ'});
});
router.get('/error', function(req, res){
	res.render('error', { title: 'Lỗi' });
});
module.exports = router;