const express =require('express');
const config =require('../config');
const commen =require('../libs/commen');

let admin =express.Router();
module.exports = admin;
//登陆检验
admin.use((req,res,next)=>{
  if(!req.session['cookie_id']&&req.path!='/login'){
      res.redirect('/admin/login');
  }else {
      next();
  }
});

//登陆界面
admin.get('/login',(req,res)=>{
  res.render('login',{error:''})
});
//提交信息
admin.post('/login',(req,res)=>{
  let {user,pass}=req.body;
  if(user==config.root_user){
    if(commen.md5(pass) ==config.root_pass){
        console.log("超级管理员登陆成功");
        req.session.cookie_id =  1;
        // res.cookie('cookie_id',1,{signed:true,maxAge:1200000});
        res.redirect('/admin/');
    }else {
        console.log("超级管理员登陆失败");
        return_key("用户名或密码输入错误");
    }
  }else {
        req.db.query(`SELECT * FROM admin_table WHERE username='${user}'`,(err,data)=>{
          if(err){
            console.log(err);
            return_key('数据库出错，请稍后再试')
          }else if(data.length ==0){
            return_key('用户名或密码输入错误')
          }else {
            if(data[0].password==commen.md5(pass)){
              console.log("管理员登陆成功");
              req.session.cookie_id =data[0].ID;
              // res.cookie('cookie_id',data[0].ID,{signed:true,maxAge:1200000});
              res.redirect('/admin/');
            } else {
              console.log("管理员登陆失败");
              return_key('用户名或密码输入错误')
            }
          }
        })
  }
  function return_key(e) {
    res.render('login',{error:e});
  }
});
//admin 根目录
admin.get('/',(req,res)=>{
    res.redirect('/admin/house');
});

admin.get('/house',(req,res)=>{
  req.db.query(`SELECT * FROM house_table`,(err,data)=>{
    if(err){
      res.sendStatus(500);
      console.log("数据库查询错误");
    }else {
      res.render('index',{data});
    }
  })

});
