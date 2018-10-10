const express = require("express");
const pool = require("../pool.js");
var router = express.Router();

router.get("/",(req,res)=>{
    var sku = req.query.sku;
    var reg = /^\d{6}$/;
    if(!reg.test(sku)){
        res.send({code:-1,msg:"sku必须是六位的数字！"});
        return;
    }
    var sql = "SELECT `id`, `sku`, `title`, `onsale_price`, `taste`, `package` FROM `la_product` WHERE sku=?";
    pool.query(sql,[sku],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:result});
    })
})

module.exports = router;