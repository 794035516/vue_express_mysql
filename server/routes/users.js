var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
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

router.get("/addArticle", (req, res) => {
  var sql1 = `insert into user_article values(${req.query.id},0);`;
  connection.query(sql1, (err, results) => {
    if (err) {
      res.send(err + '--' + sql1);
    }
    // res.send(results.data);
    var sql2 = `insert into article values(last_insert_id(),'zheli','爱你','啊啊啊');`;
    connection.query(sql2,(err2,results2) =>{
      if(err2){
        res.send(err2);
      }
      res.send(results2);
    })
    // var sql2 = ``
  });
})

module.exports = router;
