const express = require("express");
var pool = require("../pool.js");
var router = express.Router();

// 加载pro_index.html页面
router.get("/",(req,res)=>{
    var id = req.query.id;
    var req = /^\d{1,6}$/;
    if(!req.test(id)){
        res.send({code:-1,msg:"商品id需是1~6位的数字"});
    }
    var obj = {
        product: {},
        tastes: [],
        packages: [],
        pics: [],
        skuInfo: []
    };
    (async function(){
        // 获取商品信息
        await new Promise(function(open){
            var sql = "SELECT `id`, `family_id`, `sku`, `title`, `discount_msg`, `onsale_price`, `origin_price`, `month_sold`, `total_sold`, `total_comments`, `taste`, `package`, `storage` FROM `la_product` WHERE id=?";
            pool.query(sql,[id],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.product=result[0];
                }
                open();
            })
        });
        // 获取商品口味信息
        await new Promise(function(open){
            var sql = "SELECT DISTINCT `taste` FROM `la_product` WHERE family_id=(SELECT `family_id` FROM la_product WHERE id=?)";
            pool.query(sql,[id],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.tastes=result;
                }
                open();
            })
        })
        // 获取商品包装信息
        await new Promise(function(open){
            var sql = "SELECT DISTINCT `package` FROM `la_product` WHERE family_id=(SELECT `family_id` FROM la_product WHERE id=?)"
            pool.query(sql,[id],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.packages=result;
                }
                open();
            })
        })
        // 获取大中小图
        await new Promise(function(open){
            var sql = "SELECT `id`, `pro_id`, `sm`, `md`, `lg` FROM `la_pro_pics` WHERE pro_id=?";
            pool.query(sql,[id],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.pics=result;
                }
                open();
            })
        })
        // 获取一个商品的所有sku信息
        await new Promise(function(open){
            var sql = "SELECT `id`, `sku`, `onsale_price`, `origin_price`, `taste`, `package`, `storage` FROM `la_product` WHERE pro_id=?";
            pool.query(sql,[id],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.skuInfo=result;
                }
                open();
            })
        })
        res.send({code:1,msg:obj});
    }())
})

//付款界面
router.get("/pay",(req,res)=>{
    var sku = req.query.sku;
    var num = req.query.num;
    var reg = /^\d{6}$/;
    // if(!reg.test(sku)){
    //     res.send({code:-1,msg:"商品sku号必须是六位的数字！"});
    //     return;
    // }
    var sql = "SELECT `id`, `pro_id`, `family_id`, `title`, `onsale_price`, `taste`, `package` FROM `la_product` WHERE sku=?";
    pool.query(sql,[sku],(err,result)=>{
        if(err) throw err;
        if(result.lenght>0){
            res.send({code:1,msg:result});
        }
    })
})

module.exports = router;