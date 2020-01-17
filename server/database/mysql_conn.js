var mysql = require("mysql")

let connection = {

    host: 'localhost',
    user: 'root',
    password: "794035516",
    // 执行多个sql语句
    // multipleStatements:true
    database: "express",
}
var link = mysql.createConnection(connection);

link.connect(()=>{
    console.log('the connection of database successful');
})

link.query(`use ${connection.database}`,(err,results) =>{
    console.log('use database express..');
})

module.exports = link;