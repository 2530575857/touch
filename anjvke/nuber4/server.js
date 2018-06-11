const express =require('express');
const bodyParser =require('body-parser');
const Thelog =require('./libs/TheLog');


let server =express();
server.listen(8080);
server.use(Thelog);//日志
server.use(bodyParser.urlencoded({}));
server.user(express.static('./www/'))

server.post('/',(req,res,next)=>{
console.log(  req.body);
})
