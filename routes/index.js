var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();
var conn = require('../connect');
var firstImage = require('../firstimage');
router.get('/',function(req,res)
{
	var sql = 'SELECT AVG(Diem_DG) as Diem_TB, COUNT(Diem_DG) as SoLuong_DG, tbl_nhatro.* FROM tbl_danhgia, tbl_nhatro WHERE ID_NT=ID_NhaTro_DG GROUP BY ID_NT';
	
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