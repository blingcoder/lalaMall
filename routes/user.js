const express = require('express');
const pool = require('../pool.js');//导入连接数据库的模块
//使用express模块创建路由器
var router = express.Router();

//用户登录
router.post('/login',(req, res)=>{
    //解构用户端查询对象
    var {uname, upwd} = req.body;
    //判断用户名、密码不能为空
    if(!uname){
        res.send('用户名不能为空');
        return;
    }
    if(!upwd){
        res.send('用户密码不能为空');
        return;
    }
    //查询用户名和密码是够匹配
    var sql = 'SELECT * FROM la_user WHERE uname=? AND upwd=?';
    pool.query(sql,[uname, upwd], (err, result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:'登录成功'});
        }else{
            res.send({code:-3,msg:'登录失败！用户名或密码错误！'});
        }
    })
});

//导出路由
module.exports = router;