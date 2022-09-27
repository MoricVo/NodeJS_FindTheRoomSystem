var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();
var conn = require('../connect');
router.get('/',function(req,res)
{
       res.render('index',{title:'Trang chủ'});
});
router.get('/Views_DS_Baiviet',function (req,res)
{
var sql ='select * from tbl_baidang' ;
conn.query(sql,function(error,results) {
if(error)
{
    res.send(error);
}
else
{
    res.render('Views_DS_Baiviet',{
               title:"Danh sách bài viết!",
               tbl_baidang:results
    });
}
});

});
module.exports = router;