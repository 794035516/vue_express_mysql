var express = require('express');
var router = express.Router();
// var  mysql = require('mysql')
// var database = require('../database/mysql_conn')
// var connection = mysql.createConnection(database);
// connection.connect();


// connection.query(`use ${database.database};`, (err, results) => {
//   if (err) {
//     console.log(err + '--' );
//   } else {
//     console.log(results + "use database express");
//   }
// });

var connection = require('../database/mysql_conn')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(`users -- ${req.query.id}`);
});
// 先添加图片，通过lastInsertId获取
router.get("/addArticle", (req, res) => {
  
  // res.send(`form: ${req.query.id}  ,${req.query.form}`)

})

module.exports = router;
