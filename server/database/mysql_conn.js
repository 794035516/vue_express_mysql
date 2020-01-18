var mysql = require("mysql")

let link = {

    host: 'localhost',
    user: 'root',
    password: "794035516",
    // 执行多个sql语句
    // multipleStatements:true
    database: "express",
}
var connection = mysql.createConnection(link);

connection.connect(()=>{
    console.log('the connection of database successful');
})

connection.query(`use ${link.database}`,(err,results) =>{
    console.log('use database express..');
})

module.exports = connection;