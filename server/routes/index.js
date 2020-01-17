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

// router.get('/users',(req,res)=>{
//   res.send(`index -- ${req.body.id}`)
// })

router.post('/checkLogin', function (req, res) {

  // connection.query是一个异步方法，所以如果里面使用了res.send,外面
  // 就不要使用res.send，不然不会执行connection.query方法
  // 可以通过模块化处理
  // connection.query('select 1+1 as solution ', (err, results) => {
  var sql = `select * from login 
  where userName = '${req.body.userName}' 
  or userName    = '${req.body.userName}'
  or userName    = '${req.body.userName}'
  or userName    = '${req.body.userName}'
  and password   = '${req.body.pwd     }'; `;

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


router.post("/getUserArticle",(req,res) =>{
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



// router.get('/getLessonList', (req, res) => {
//   var type = req.body.type;
//   if (type == 'pay') {
//     var sql = `select lesson.* from lesson
//     left join sign on sign.lessonId = lesson.id
//     left join user on user.id = sign.userId
//     where lesson.cost > ${cost}
//     and user.id = ${req.body.id};`
//   } else if (type == 'free') {
//     var sql = `select lesson.* from lesson
//     left join sign on sign.lessonId = lesson.id
//     left join user on user.id = sign.userId
//     where lesson.cost > ${cost}
//     and user.id = ${req.body.id};`
//   }

//   connection.query(sql, (err, results) => {
//     if (err) {
//       res.send(err);
//       throw err;
//     } else {
//       res.send(results);

//     }
//   })

// })

// router.get('/getUserLesson', (req, res) => {
//   var sql = 'select * from lesson;'
//   connection.query(sql, (err, results) => {
//     if (err) {
//       // throw err;
//       res.send(err);
//     } else {
//       res.send(results);
//       console.log(results)
//     }
//   })
//   console.log(sql)
// })

module.exports = router;

