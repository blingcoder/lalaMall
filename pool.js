//引入mysql模块
const mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'la_mall'
});
//导出连接数据库
module.exports = pool;