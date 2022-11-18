var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var conn = require("../connect");
var { check, validationResult } = require("express-validator");
router.get("/", function (req, res) {

  var sql ='select * from tbl_danhgia' ;
  var sql = 'SELECT b.*, c.TenNhaTro_NT, t.Ten_ND \
			   FROM tbl_danhgia b, tbl_nhatro c, tbl_nguoidung t \
			   WHERE b.ID_NhaTro_DG = c.ID_NT AND b.ID_NguoiDung_DG = t.ID_ND \
			   ORDER BY Ngay_DG DESC';
  conn.query(sql, function (error, results) {
    if (error) {
      res.send(error);
    } else {
      res.render("admin/danhgia_danhsach", {
        title: "Danh sách đánh giá phòng trọ!",
        tbl_danhgia: results,
      });
    }
  });
});

// GET: Xóa tài khoản
// router.get('/xoa/:id', function(req, res){
// 	var id = req.params.id;
// 	var sql = 'DELETE FROM tbl_baidang WHERE ID_BD = ?';
// 	conn.query(sql, [id], function(error, results){
// 		if(error) {
// 			req.session.error = error;
// 			res.redirect('/error');
// 		} else {
// 			res.redirect('/views_danhsach_baidang');
// 		}
// 	});
// });

module.exports = router;
