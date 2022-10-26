var express = require('express');
var router = express.Router();
var conn = require('../connect');
var firstImage = require('../firstimage');
var { check, validationResult } = require('express-validator');



// GET: Danh sách nhà trọ
router.get('/danhsach', function(req, res){
    var sql = 'SELECT *, Ten_ND FROM tbl_nhatro, tbl_nguoidung WHERE ID_ND = ID_ChuTro_NT';
	conn.query(sql, function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('views_danhsach_nhatro', {
				title: 'Danh sách nhà trọ',
				NhaTro: results
			});
		}
	});
});
//GET: Thông tin chi tiết trọ
router.get('/chitiet/:id_nhatro', function(req, res){
	var id_nhatro = req.params.id_nhatro;
	var sql = "SELECT *FROM tbl_nhatro WHERE ID_NT = ?;\
				SELECT Ten_ND, Ngay_DG, NoiDung_DG, Diem_DG FROM tbl_danhgia, tbl_nguoidung \
				WHERE ID_NhaTro_DG = " + id_nhatro + " AND ID_NguoiDung_DG = ID_ND ORDER BY Ngay_DG DESC;\
				SELECT AVG(Diem_DG) as Diem_TB, COUNT(Diem_DG) as SoLuong_DG FROM tbl_danhgia WHERE ID_NhaTro_DG = " + id_nhatro;
	conn.query(sql, [id_nhatro], function(error, results){
		if(error){
			req.session.error = error;
			res.redirect('/error');
		}
		else{
			res.render('views_chitiet_nhatro',{
				nt: results[0].shift(),
				DanhGia: results[1],
				Diem_TB: results[2].shift(),
				firstImage: firstImage
			});
		}
	})
});

router.get('/dangky_nhatro/', function(req, res){
	res.render('views_dangky_nhatro');
});

//POST: Đánh giá
router.post("/danhgia/:id_nhatro", function (req, res) {
	var errors = validationResult(req);
	if (!errors.isEmpty()) {
	  res.render("views_chitiet_nhatro", {
		errors: errors.array(),
	  });
	} else {
	var data = {
		ID_NhaTro_DG: req.params.id_nhatro,
		ID_NguoiDung_DG: req.session.ID_ND,
		NoiDung_DG:	req.body.NoiDung_DG,
		Diem_DG: req.body.Diem_DG
	  };
	  var sql = "INSERT INTO tbl_danhgia SET ?";
	  conn.query(sql, data, function (error, results) {
		if (error) {
		  req.session.error = error;
		  res.redirect("/error");
		} else {
		  req.session.success = "Đã thêm đánh giá.";
		  res.redirect("/nhatro/chitiet/" + req.params.id_nhatro);
		  // res.redirect('/success');
		}
	  });
	}
  });


module.exports = router;