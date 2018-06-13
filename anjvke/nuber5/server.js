const express =require('express');
const consolidate =require('consolidate');
let server =express();
server.listen(8080);

server.use('/user',require('./routers/user'));//路由
server.use('/wj',require('./routers/wj'));

server.engine('html',consolidate.ejs);
server.set('view engine','ejs');
server.set('views','./template');
