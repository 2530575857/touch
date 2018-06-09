const express =require('express');
const mysql =require('mysql');
const md5 = require('md5');
const uuid =require('uuid/v4');
const crypto =require('crypto')


let server =express();
server.listen(8080);
let db =mysql.createPool({host:'localhost',user:'root',password:'qq123456',database:'20180314'});


server.get('/reg',(req,res,next)=>{//验证字段是否符合  规则
  let {user,pass}=req.query;
  if(!user&&!pass){
      res.send({code:1,mag:"密码用户名不能为空"});
  }else if(!/^\w{6,32}$/g.test(user)){
      res.send({code:1,mag:"用户名必须是6/32 包括数字，字母，下划线"});
  }else if (!/^.{6,}$/g.test(pass)) {
      res.send({code:1,mag:"密码必须六位以上"});
  }else {
    next();
  }
});
server.get('/reg',(req,res,next)=>{//查询user字段是否存在
  let {user,pass}=req.query;
  db.query(`SELECT username FROM userzc WHERE username='${user}'` ,(err,data)=>{
    if(err){
        res.send({code:1,mag:"数据库错误1"});
    }else if (data.length>0) {
        res.send({code:1,mag:"用户名已存在"});
    }else {
      next();
    }
  })
});

server.get('/reg',(req,res,next)=>{//查询id字段是否存在
  let {user,pass}=req.query;
  _next();
  function _next(){
    let id =uuid().replace(/\-/g,"");
    db.query(`SELECT id FROM userzc WHERE id='${id}'`,(err,data)=>{
      if(err){
          res.send({code:1,mag:"数据库错误2"});
      }else if (data.length>0) {
          _next()
      }else {
        req._uuid=id;
        next();
      }
    })
  }
});

server.get('/reg',(req,res,next)=>{//对字段进行 MD5  编码
  let {user,pass}=req.query;

  let md5 =crypto.createHash('md5');
  md5 .update(pass);
  pass =md5.digest('hex');

  db.query(`INSERT INTO userzc (id,username,password) VALUES('${req._uuid}','${user}','${pass}') `,(err,data)=>{
    if(err){
      res.send({code:1,mag:"数据库错误3"});
    }else {
      res.send({code:0,mag:"注册成功"});
    }
  })
});
