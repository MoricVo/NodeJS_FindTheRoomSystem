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
var validateForm = [
  check("TenNguoiDung_BD")
    .notEmpty()
    .withMessage("Họ và tên không được bỏ trống."),
  check("NoiDung_BD")
    .notEmpty()
    .withMessage("Tên đăng nhập không được bỏ trống."),

  check("GhiChu_BD").notEmpty().withMessage("Mật khẩu không được bỏ trống."),
];
router.get("/them", function (req, res) {
  res.render("views_them_baidang", { title: "Thêm bài đăng" });
});

router.post("/them", upload.single("Anh_BD"), function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) fs.unlink(req.file.path, function (err) {});
    res.render("views_them_baidang", {
      title: "Thêm bài đăng",
      errors: errors.array(),
    });
  } else {
    var fileName = "";
    if (req.file) fileName = req.file.filename;
    var data = {
      ID_NhaTro_BD: req.body.ID_NhaTro_BD,
      TenNguoiDang_BD: req.body.TenNguoiDang_BD,
      TieuDe_BD: req.body.TieuDe_BD,
      NoiDung_BD: req.body.NoiDung_BD,
      Anh_BD: fileName,
      NgayDang_BD: req.body.NgayDang_BD,
      NgayCapNhat_BD: req.body.NgayCapNhat_BD,
      LuotXem_BD: req.body.LuotXem_BD,
      GhiChu_BD: req.body.GhiChu_BD,
      KiemDuyet_BD: req.body.KiemDuyet_BD,
    };
    var sql = "INSERT INTO tbl_baidang SET ?";
    conn.query(sql, data, function (error, results) {
      if (error) {
        req.session.error = error;
        res.redirect("/error");
      } else {
        req.session.success = "Đã thêm bài đăng thành công.";
        res.redirect("/views_danhsach_baidang");
        // res.redirect('/success');
      }
    });
  }
});
// GET: Sửa tài khoản
router.get("/sua/:id", function (req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM tbl_baidang WHERE ID_BD = ?";
  conn.query(sql, [id], function (error, results) {
    if (error) {
      req.session.error = error;
      res.redirect("/error");
    } else {
      res.render("views_sua_baidang", {
        title: "Sửa bài đăng",
        /*ID: results[0].ID,
				HoVaTen: results[0].HoVaTen,
				Email: results[0].Email,
				HinhAnh: results[0].HinhAnh,
				TenDangNhap: results[0].TenDangNhap,
				MatKhau: results[0].MatKhau,
				QuyenHan: results[0].QuyenHan,
				KichHoat: results[0].KichHoat,*/
        tbl_baidang: results[0],
      });
    }
  });
});
router.post("/sua/:id", upload.single("Anh_BD"), function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) fs.unlink(req.file.path, function (err) {});
    res.render("views_sua_baidang", {
      title: "Sửa bài đăng",
      ID_BD: req.params.id,
      ID_NhaTro_BD: req.body.ID_NhaTro_BD,
      TenNguoiDang_BD: req.body.TenNguoiDang_BD,
      TieuDe_BD: req.body.TieuDe_BD,
      NoiDung_BD: req.body.NoiDung_BD,
      Anh_BD: req.body.Anh_BD,
      NgayDang_BD: req.body.NgayDang_BD,
      NgayCapNhat_BD: req.body.NgayCapNhat_BD,
      LuotXem_BD: req.body.LuotXem_BD,
      GhiChu_BD: req.body.GhiChu_BD,
      KiemDuyet_BD: req.body.KiemDuyet_BD,

      errors: errors.array(),
    });
  } else {
    var baidang = {
      ID_NhaTro_BD: req.body.ID_NhaTro_BD,
      TenNguoiDang_BD: req.body.TenNguoiDang_BD,
      TieuDe_BD: req.body.TieuDe_BD,
      NoiDung_BD: req.body.NoiDung_BD,

      NgayDang_BD: req.body.NgayDang_BD,
      NgayCapNhat_BD: req.body.NgayCapNhat_BD,
      LuotXem_BD: req.body.LuotXem_BD,
      GhiChu_BD: req.body.GhiChu_BD,
      KiemDuyet_BD: req.body.KiemDuyet_BD,
    };
    if (req.file) {
      baidang["Anh_BD"] = req.file.filename;
    }
    var id = req.params.id;
    var sql = "UPDATE tbl_baidang SET ? WHERE ID_BD = ?";
    conn.query(sql, [baidang, id], function (error, results) {
      if (error) {
        req.session.error = error;
        res.redirect("/error");
      } else {
        res.redirect("/views_danhsach_baidang");
      }
    });
  }
});

router.get("/", function (req, res) {
  var sql = "select * from tbl_baidang";
  conn.query(sql, function (error, results) {
    if (error) {
      res.send(error);
    } else {
      res.render("views_danhsach_baidang", {
        title: "Danh sách bài viết!",
        tbl_baidang: results,
      });
    }
  });
});

// GET: Xóa tài khoản
router.get("/xoa/:id", function (req, res) {
  var id = req.params.id;
  var sql = "DELETE FROM tbl_baidang WHERE ID_BD = ?";
  conn.query(sql, [id], function (error, results) {
    if (error) {
      req.session.error = error;
      res.redirect("/error");
    } else {
      res.redirect("/views_danhsach_baidang");
    }
  });
});

// GET: Duyệt bài viết
router.get("/duyet/:id", function (req, res) {
  var id = req.params.id;
  var sql =
    "UPDATE tbl_baidang SET KiemDuyet_BD = 1 - KiemDuyet_BD WHERE ID_BD = ?";
  conn.query(sql, [id], function (error, results) {
    if (error) {
      req.session.error = error;
      res.redirect("/error");
    } else {
      res.redirect("back");
    }
  });
});
module.exports = router;
