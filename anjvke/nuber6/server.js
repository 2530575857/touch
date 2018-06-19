const express =require('express');
const bodyParser =require('body-parser');
const multer =require('multer');
const cookieParser =require('cookie-parser');
const cookieSession =require('cookie-session');
const consolidate =require('consolidate');
const mysql =require('mysql');
const config =require('./config')

let server = express();
server.listen(config.port);

let db =mysql.createpool({host:config.mysql_host,user:config.mysql_user,password:config.mysql_pass,database:config.mysql_dbname})
console.log(db);
