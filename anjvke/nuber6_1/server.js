const express =require('express');
const bodyParser =require('body-parser');
const multer =require('multer');
const cookieParser =require('cookie-parser');
const cookieSession =require('cookie-session');
const consolidate =require('consolidate');
const mysql =require('mysql');
const expressStatic = require('express-static');

const config =require('./config');
const thelog =require('./libs/thelog')

let server=express();
server.listen(config.port);

let db =mysql.createPool({host:config.mysql_host,user:config.mysql_user,password:config.mysql_password,database:config.mysql_data});

server.use((req,res,next)=>{
  req.db =db;
  next();
});
server.use(thelog);


server.use(bodyParser.urlencoded({}));
server.use(multer({dest:'./uploads'}).any());

server.use(cookieParser(require('./secret/cookie_key')));
server.use(cookieSession({ name: 'session',keys:require('./secret/session_key')}));

server.engine('html',consolidate.ejs);
server.set('view engine','ejs');
server.set('views','./template');

server.use('/admin',require('./routers/admin'));
// server.use('/',require('./routers/www_router'));

server.use(expressStatic('./www/'));
