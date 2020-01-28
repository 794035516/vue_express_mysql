var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path')
var multer = require('multer');
var connection = require('../database/mysql_conn')
//生成的图片放入uploads文件夹下
var upload = multer({ dest: 'uploads/' });
// 图片上传必须使用post

router.get('/', (req, res) => {
    res.send(`test ${req.query.id}`);
})
/*
 通过在postMan中，测试
    使用Post方式，地址是http://localhost:888/upload/img
    body选择form-data，key为test(与下面对应)，value选择一个图片
 */
router.post('/img', upload.single('img'), (req, res) => {
    // console.log(req.file);
    // res.send('upload img...');
    //postman测试的

    // res.send(req.body)

    // if(req.file && req.file.path){
    //     res.send(req.file)
    // }else{
    //     res.send(req.body.content)
    // }

    var params = req.body
    if (params.pic == "") {
        var keepname;
        fs.readFile(req.file.path, (err, data) => {
            if (err) {
                return res.send('上传图片失败');
            }
            extname = req.file.mimetype.split('/')[1];
            keepname = req.file.filename + '.' + extname;
            fs.writeFile(path.join(__dirname, `../static/img/${keepname}`), data, (err) => {
                if (err) {
                    return res.send('写入失败');
                }
                // return res.send({err:0,msg:'上传OK...',data:`http://localhost:${portNumber}/img/`+keepname,file:req.file.filename} );
            })

            var portNumber = 888;
            var pic = `http://localhost:${portNumber}/img/${keepname}`;
            var sql1 = `insert into article(id,title,class,content,times,pic)
            value(0,'${params.title}','${params.type}','${params.content}',0,'${pic}');`
            var sql2 = `insert into user_article(id,userId,articleId)
            value(0,${params.id},last_insert_id());`
            connection.query(sql1, (err, results) => {
                if (err) {
                    res.send(`${err} , ${sql1}`)
                }
                connection.query(sql2, (err2, result2) => {
                    if (err2) {
                        res.send(`${err2} , ${sql2}`);
                    }
                    res.send(result2);
                })
            })
        })
    }
    else {

        var sql1 = `
        insert into article(id,title,class,content,times,pic)
        values(0,'${params.title}','${params.type}','${params.content}',0,'${params.pic}');`;
        var sql2 = `insert into user_article(id,userId,articleId)
        value(0,${params.id},last_insert_id());`


        connection.query(sql1, (err, results) => {
            if (err) {
                res.send(`${err} , ${sql1}`)
            }
            connection.query(sql2, (err2, result2) => {
                if (err2) {
                    res.send(`${err2} , ${sql2}`);
                }
                res.send(result2);
            })
        })

    }

})

// let form = new formidable.IncomingForm();
// form.parse(req,function(err,fields,files){
//     if(err){
//         return res.json({
//             code:500,
//             message:"内部服务器错误"
//         })
//     }
//     let extname = path.extname(files.avatar.name)
//     let oldpath = files.avatar.path;
//     let newpath = './public/img'+extname;
//     let avatarname = 'avatar' + extname;
//     fs.rename(oldpath,newpath,err=>{
//         if(err){
//             return res.json({
//                 code:401,
//                 message:"图片上传失败"
//             })
//         }
//     })
//     return res.send(req.file)
// })
// })

module.exports = router;