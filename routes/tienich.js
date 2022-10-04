var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var conn = require("../connect");
var { check, validationResult } = require("express-validator");
var multer = require("multer");
var storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    var timestamp = Date.now();
    callback(null, timestamp + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storageConfig });

router.get("/", function (req, res) {
  var sql = "select * from tbl_tienich";
  conn.query(sql, function (error, results) {
    if (error) {
      res.send(error);
    } else {
      res.render("views_danhsach_tienich", {
        title: "Danh sách tiện ích!",
        tbl_tienich: results,
      });
    }
  });
});
router.get("/them", function (req, res) {
  res.render("views_them_tienich", { title: "Thêm tiện ích" });
});

router.post("/them", function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("views_them_tienich", {
      title: "Thêm tiện ích",
      errors: errors.array(),
    });
  } else {
    var data = {
      Icon_TI: req.body.Icon_TI,
      Ten_TI:req.body.Ten_TI,
      Gia_TI:req.body.Gia_TI,
    };
    var sql = "INSERT INTO tbl_tienich SET ?";
    conn.query(sql, data, function (error, results) {
      if (error) {
        req.session.error = error;
        res.redirect("/error");
      } else {
        req.session.success = "Đã thêm tiện ích thành công.";
        res.redirect("/views_danhsach_tienich");
        // res.redirect('/success');
      }
    });
  }
});


// GET: Sửa tài khoản
router.get('/sua/:id', function(req, res){
	var id = req.params.id;
	var sql = 'SELECT * FROM tbl_tienich WHERE ID_TI = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.render('views_sua_tienich', {
				title: 'Sửa bài đăng',
				/*ID: results[0].ID,
				HoVaTen: results[0].HoVaTen,
				Email: results[0].Email,
				HinhAnh: results[0].HinhAnh,
				TenDangNhap: results[0].TenDangNhap,
				MatKhau: results[0].MatKhau,
				QuyenHan: results[0].QuyenHan,
				KichHoat: results[0].KichHoat,*/
				tbl_tienich: results[0]
			});
		}
	});
});
router.post('/sua/:id', function(req, res){
	var errors = validationResult(req);
	if(!errors.isEmpty()) {
		res.render('views_sua_baidang', {
			title: 'Sửa tiện ích',
			ID_BD: req.params.id,
           Icon_TI:req.body.Icon_TI,
           Ten_TI:req.body.Ten_TI,
           Gia_TI:req.body.Gia_TI,
		
		
			errors: errors.array()
		});
	} else {
		var tienich = {
      Icon_TI:req.body.Icon_TI,
      Ten_TI:req.body.Ten_TI,
      Gia_TI:req.body.Gia_TI,
			
		};
		var id = req.params.id;
		var sql = 'UPDATE tbl_tienich SET ? WHERE ID_TI = ?';
		conn.query(sql, [tienich, id], function(error, results){
			if(error) {
				req.session.error = error;
				res.redirect('/error');
			} else {
				res.redirect('/views_danhsach_tienich');
			}
		});
	}
});

router.get('/xoa/:id', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM tbl_tienich WHERE ID_TI = ?';
	conn.query(sql, [id], function(error, results){
		if(error) {
			req.session.error = error;
			res.redirect('/error');
		} else {
			res.redirect('/views_danhsach_tienich');
		}
	});
});

module.exports = router;
