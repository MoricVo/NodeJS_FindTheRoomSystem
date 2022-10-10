var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();
var conn = require('../connect');
var firstImage = require('../firstimage');
router.get('/',function(req,res)
{
	var sql = 'select * from tbl_nhatro';
	
	conn.query(sql, function(error, results){
		if(error){
			req.session.error = error;
			res.redirect('/error');
		}
		else{
			res.render('index',{
				title: 'Home',
				NhaTro: results,
				firstImage: firstImage
			});
		}
	});
});
router.get('/error', function(req, res){
	res.render('error', { title: 'Lỗi' });
});
// GET: Thành công
router.get('/success', function(req, res){
	res.render('success', { title: 'Hoàn thành' });
});





module.exports = router;