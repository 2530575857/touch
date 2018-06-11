const express =require('express');
const bodyParser =require('body-parser');//普通上传 post   解决
const Thelog =require('./libs/TheLog');
const expressStatic = require('express-static');

let server =express();
server.listen(8080);
server.use(Thelog);//日志
server.use(bodyParser.urlencoded({}));//普通上传 post   解决 存到req.body
server.use(expressStatic('./www'));  //www  直接返回这个文件请求内容

server.get('/index.html',(req,res,next)=>{
  console.log(req);
})
