//引入项目所需要的模块
const express = require('express');
const user = require('./routes/user.js');
const index = require('./routes/index.js');
const details = require('./routes/details.js');
const pay = require('./routes/pay.js');
const bodyParser = require('body-parser');
//1. 使用express构建服务器
var app = express();
app.listen(8080);

//2. 托管静态资源
app.use(express.static('./static'));

//配置body-parser,使用body-parser中间件，把获取到的客户端的信息转成一个对象
app.use(bodyParser.urlencoded({
    extended: false //不使用querystring的查询字符串
}));

//将用户路由器挂载到user下  /user
app.use('/user',user);
//将首页路由器挂载到index下 /index
app.use('/index',index);
app.use('/details',details);
app.use('/pay',pay);