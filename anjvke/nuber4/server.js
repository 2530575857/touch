const express =require('express');
const bodyParser =require('body-parser');
const Thelog =require('./libs/TheLog');
const expressStatic = require('express-static');

let server =express();
server.listen(8080);
server.use(Thelog);//日志
server.use(bodyParser.urlencoded({}));
server.use(expressStatic('./www'));

server.get('/index.html',(req,res,next)=>{
  console.log(req);
})
