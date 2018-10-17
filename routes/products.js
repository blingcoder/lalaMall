const express = require("express");
const pool = require("../pool.js");
const router = express.Router();

router.get("/", (req, res)=>{
    var {kw,pno,pageSize} = req.query;
    if(!pageSize){pageSize=8};
    var kws = kw.split(" "); 
    kws.forEach((elem,i,kws)=>{
        kws[i] = ` title LIKE "%${elem}%" `;
    });
    var str = kws.join("and");
    var where = ` WHERE ${str}`;
    var sql = `SELECT id, pro_id, family_id, sku, title, discount_msg, onsale_price, origin_price, month_sold, sold, total_comments, taste, package, storage, (SELECT md FROM la_pro_pics WHERE pro_id=pro_id LIMIT 1) as md FROM la_product`;
    sql += where;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var data = {};
        data.pno = parseInt(pno);
        data.pageCount = Math.ceil(result.length/pageSize);
        data.pros = result.slice(data.pno*pageSize,data.pno*pageSize+pageSize);
        res.send(data);
    })
});

module.exports = router;