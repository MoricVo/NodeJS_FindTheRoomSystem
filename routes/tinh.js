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
  var sql = "select * from province";
  conn.query(sql, function (error, results) {
    if (error) {
      res.send(error);
    } else {
      res.render("views_danhsach_tinh", {
        title: "Danh sách tỉnh!",
        province: results,
      });
    }
  });
});

module.exports = router;
