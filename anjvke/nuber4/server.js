const path =require('path');
const  fs =require('fs');
const express =require('express');
const bodyParser =require('body-parser');//普通上传 post   解决
const Thelog =require('./libs/TheLog');
const expressStatic = require('express-static');

const multer =require('multer')
let multerOBJ=multer({dest:'./uploads/'})//储存在那个文件夹下

const cookieParser =require('cookie-parser');//cookie
const cookieSession =require('cookie-session');//session

let server =express();
server.listen(8080);
server.use(Thelog);//日志

server.use(cookieParser(['djlkjeijefjalsdwqiu309','wetsdfkoer90e8r456'])) //kookie
server.get('/',(req,res,next)=>{
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.cookie('name',3,{maxAge:1000000,signed:true})
  res.end()
  next();
  // //2018-06-12T06:20:32.620Z
})

server.use(cookieSession({secret:'sdfdgdfg456456465sdfdgdfg456456465sdtegsdf'}))//session
server.get('/',(req,res,next)=>{
    req.session['aaa']=888;
    console.log(req.session.aaa);
})

server.use(bodyParser.urlencoded({}));//普通上传 post   解决 存到req.body
// server.use(expressStatic('./www'));  //www  直接返回这个文件请求内容
server.post('/uploads',multerOBJ.any(),(req,res,next)=>{//这里有文件上传限制   这个需要去学习
  console.log(req.files);
  console.log(req.body);

  let i =0
  fsname(i)
  function fsname(n) {
    fs.rename(`./${req.files[n].path}`,`./uploads/${req.files[n].filename}.${path.extname(req.files[n].originalname)}`,(err)=>{
      if(err){
          console.assert("修改名字出现错误"+err);
      }else {
          i++
          if(i<req.files.length){
              fsname(i)
          }else {
              console.log("改名完成");
          }
      }
    })
  }
})//文件上传   post     用到了multer  中间键


server.post('/logli',(req,res,next)=>{
    console.log(req.body);
})
server.get('/index.html',(req,res,next)=>{
  // console.log(req);
})
server.get('/baidu',(req,res,next)=>{
  console.log("重定向到百度");
  res.redirect('http://www.baidu.com')
  // res.download('./www/index.html')
  // console.log(res.download('./www/index.html'));
})
