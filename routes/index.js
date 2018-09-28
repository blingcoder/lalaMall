const express = require("express");
const pool = require("../pool.js");
const router = express.Router();

router.get("/top_seller_onsale", (req, res)=>{
    var sql = "SELECT * FROM la_top_seller_onsale ORDER BY id";
    pool.query(sql, [], (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
});

module.exports = router;