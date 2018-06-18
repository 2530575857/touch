const express =require('express');
const thelog =require('./libs/thelog')//日志
const consolidate =require('consolidate');//模板引擎
const multer =require('multer');//文件上传
const bodyParser =require('body-parser');//普通上传 post   解决

let server =express();
server.listen(8080);
server.use(thelog);//日志
server.use(bodyParser.urlencoded({}));//普通上传 post   解决 存到req.body
let multerobj =multer({dest:'./uploads'});//post 文件上传
server.use(multerobj.any());

server.use('/user',require('./routers/user'));//路由

server.engine('html',consolidate.ejs);
server.set('view engine','ejs');
server.set('views','./template');
