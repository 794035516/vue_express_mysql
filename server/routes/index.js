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
//     console.log(results);
//   }
// });
var connection = require('../database/mysql_conn');


// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
//   res.send('首页');
// });

// router.get('/index',(req,res)=>{
  // res.send({msg:`index -- `,data:{net:'http://localhost:888/',img:'images/ade6d0eb119d12b13f31e0bb6d491a44.jpeg'}})
  // res.send({msg:`index -- `,data:{net:'http://localhost:888/',img:'static/img/d1fe02917e02c199bb465c7f130b1bd4.jpeg'}})
// })

router.post('/checkLogin', function (req, res) {

  // connection.query是一个异步方法，所以如果里面使用了res.send,外面
  // 就不要使用res.send，不然不会执行connection.query方法
  // 可以通过模块化处理
  // connection.query('select 1+1 as solution ', (err, results) => {
    // 查询login表
  var sql = `select * from login 
  where userName = '${req.body.userName}' 
  and password = '${req.body.password}';`;
  
  connection.query(sql, (err,results) => {
    if (err) {
      res.send(err + "---" + sql);
    } else {
      res.send(results);
    }
  })
})

router.post('/getUserList', (req, res) => {

  var sql = `select * from user where 
  phone       = '${req.body.userName}'
  or qq       = '${req.body.userName}'
  or email    = '${req.body.userName}'
  or nickName = '${req.body.userName}';`

  connection.query(sql, (err, results) => {
    if (err) {
      res.send(err +"--"+ sql);
    } else {
        console.log(sql);
        res.send(results );
    }
  })

})


router.post('/getUserLesson',(req,res) =>{
  var sql = `select l.cost lessonCost,l.name lessonName,l.org org,group_concat(t.name) teacherName,l.pic pic from lesson as l
  left join sign as s on s.lessonId = l.id
  left join user as u on u.id = s.userId
  left join teacher_lesson as tl on tl.lessonId = l.id
  left join teacher as t on t.id = tl.teacherId
  where u.id = ${req.body.id}
  group by l.id;
  `;
  connection.query(sql ,(err,results) =>{
    if(err){
      res.send(err + "---" + sql);
    }else{
      res.send(results );
    }
  })
})

router.post('/getUserArticle',(req,res) =>{
  var sql = `select a.id as id ,u.nickName as author,a.pic as pic,a.times as times,a.title as title,
    a.class as type,a.content as content from article as a
  left join user_article as ua on ua.articleId = a.id
  left join user as u on u.id = ua.userId
  where u.id = ${req.body.id};`;
  connection.query(sql,(err,results)=>{
    if(err){
      res.send(err + '--' + sql);
    }else{
      res.send(results);
    }
  })
})
/* 
  select title,class,content,pic,times from article where id = 100;
*/ 
router.get('/getUserSingleArticle',(req,res)=>{
  var sql = `select title,class,content,pic,times from article where id = ${req.query.id};`;
  connection.query(sql,(err,results)=>{
    if(err){
      res.send(`${err} , ${sql}`);
    }
    res.send(results);
  })
})
/* 

  select l.name,l.pic lessonName,group_concat(t.name) teacherName,l.cost lessonCost from lesson as l
  left join teacher_lesson as tl on tl.lessonId = l.id
  left join teacher as t on t.id = tl.teacherId
  left join store as s on s.lessonId = l.id
  left join user as u on u.id = s.userId
  where u.id = 1 group by l.id;
*/

router.post("/getUserStore",(req,res) =>{
  var sql = `
  select l.name lessonName,l.pic pic,group_concat(t.name) teacherName,l.cost lessonCost from lesson as l
  left join teacher_lesson as tl on tl.lessonId = l.id
  left join teacher as t on t.id = tl.teacherId
  left join store as s on s.lessonId = l.id
  left join user as u on u.id = s.userId
  where u.id = ${req.body.id }
  group by l.id;`;
  connection.query(sql,(err,results) =>{
    if(err){
      res.send(err + "--" + sql);
    }else{
      res.send(results);
    }
  })
})




module.exports = router;

