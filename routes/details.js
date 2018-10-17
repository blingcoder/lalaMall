const express = require("express");
var pool = require("../pool.js");
var router = express.Router();

// 加载pro_index.html页面
router.get("/",(req,res)=>{
    var sku = req.query.sku;
    var req = /^\d{6}$/;
    if(!req.test(sku)){
        res.send({code:-1,msg:"商品sku需是6位的数字"});
    }
    var obj = {
        product: {},
        tastes: [],
        packages: [],
        specs: [],
        pics: [],
        skuInfo: []
    };
    (async function(){
        // 获取商品信息
        await new Promise(function(open){
            var sql = "SELECT `id`, `family_id`, `sku`, `title`, `discount_msg`, `onsale_price`, `origin_price`, `month_sold`, `sold`, `total_comments`, `taste`, `package`, `storage` FROM `la_product` WHERE sku=?";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.product=result[0];
                }
                open();
            })
        });
        //总销售量
        await new Promise(function(open){
            var sql = "SELECT SUM(sold) as total_sold FROM `la_product` WHERE pro_id=(SELECT pro_id FROM `la_product` WHERE sku=?)";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.product["total_sold"] = result[0].total_sold;
                }
                open();
            })
        });
        //不同规格对应的sku
        await new Promise(function(open){
            var sql = "SELECT `sku`, `taste`, `package`, `onsale_price`, `origin_price` FROM `la_product` WHERE pro_id=(SELECT pro_id FROM `la_product` WHERE sku=?)";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.specs = result;
                }
                open();
            })
        });
        // 获取商品口味信息
        await new Promise(function(open){
            var sql = "SELECT DISTINCT `taste` FROM `la_product` WHERE family_id=(SELECT `family_id` FROM la_product WHERE sku=?)";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.tastes=result;
                }
                open();
            })
        });
        // 获取商品包装信息
        await new Promise(function(open){
            var sql = "SELECT DISTINCT `package` FROM `la_product` WHERE family_id=(SELECT `family_id` FROM la_product WHERE sku=?)"
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.packages=result;
                }
                open();
            })
        });
        // 获取大中小图
        await new Promise(function(open){
            var sql = "SELECT `id`, `pro_id`, `sm`, `md`, `lg` FROM `la_pro_pics` WHERE pro_id=(SELECT pro_id from la_product WHERE sku=?)";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.pics=result;
                }
                open();
            })
        });
        // 获取一个商品的所有sku信息
        await new Promise(function(open){
            var sql = "SELECT `id`, `sku`, `onsale_price`, `origin_price`, `taste`, `package`, `storage` FROM `la_product` WHERE sku=?";
            pool.query(sql,[sku],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    obj.skuInfo=result;
                }
                open();
            })
        });
        res.send({code:1,msg:obj});
    }())
})

//付款界面
router.get("/pay",(req,res)=>{
    var sku = req.query.sku;
    var reg = /^\d{6}$/;
    if(!reg.test(sku)){
        res.send({code:-1,msg:"商品sku号必须是六位的数字！"});
        return;
    }
    var sql = "SELECT `id`, `pro_id`, `family_id`, `sku`, `title`, `onsale_price`, `taste`, `package` FROM `la_product` WHERE sku=?";
    pool.query(sql,[sku],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:result});
        }
    })
})

module.exports = router;