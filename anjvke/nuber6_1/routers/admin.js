const express =require('express');
const fs =require('fs');

const config =require('../config');
const commen =require('../libs/commen');

let admin =express.Router();
module.exports = admin;
//登陆检验
admin.use((req,res,next)=>{
  if(!req.cookies['admin_token']&&req.path!='/login'){
      res.redirect(`/admin/login?ref=${req.url}`);
  }else {
      if(req.path=='/login'){
          next();
      }else {
          req.db.query(`SELECT * FROM admin_token_table WHERE ID='${req.cookies['admin_token']}'`,(err,data)=>{
              if(err){
                  res.sendStatus(500);
                  console.log(err);
              }else if(data.length==0){
                  res.redirect(`/admin/login?ref=${req.url}`)
              }else {
                  req.admin_id =data[0].admin_ID;
                  next();
              }
          })
      }
  }
});

//登陆界面
admin.get('/login',(req,res)=>{
  res.render('login',{error:'', ref:req.query['ref']||''})
});
//提交信息
admin.post('/login',(req,res)=>{
  let {user,pass}=req.body;
  if(user==config.root_user){
    if(commen.md5(pass) ==config.root_pass){
        console.log("超级管理员登陆成功");
        // req.session.cookie_id =  1;
        fn_token(1);
        // res.cookie('cookie_id',1,{signed:true,maxAge:1200000});
        // res.redirect('/admin/');
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
              // req.session.cookie_id =data[0].ID;
              fn_token(data[0].ID);
              // res.cookie('cookie_id',data[0].ID,{signed:true,maxAge:1200000});
              // res.redirect('/admin/');
            } else {
              console.log("管理员登陆失败");
              return_key('用户名或密码输入错误')
            }
          }
        });
  }
  function return_key(e) {  //页面返回属性函数
    res.render('login',{error:e , ref:req.query['ref']||''});
  }
  function fn_token(admin_id){ //表admin_token_table
    let ID =commen.uuid();

    let odate =new Date();
    odate.setMinutes(odate.getMinutes()+20);
    let t =Math.floor(odate.getTime()/1000);
    req.db.query(`INSERT INTO admin_token_table (ID,admin_ID,expires) VALUES ('${ID}','${admin_id}',${t})`,err=>{
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else {
          res.cookie('admin_token',ID);//,{maxAge: 6000000000}
          let ref =req.query['ref'];
          if(!ref){
              ref=''
          }
          res.redirect(`/admin${ref}`);
        }
    })
  };
});

//admin 根目录
admin.get('/',(req,res)=>{
    res.redirect('/admin/house');
});

//获取房屋信息
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
//添加房屋信息
admin.post('/house',(req,res)=>{
    let img_paths =[];
    let img_real_paths=[];

    req.body['sale_time'] =Math.floor(new Date(req.body['sale_time']).getTime()/1000);
    req.body['submit_time'] =Math.floor(new Date(req.body['submit_time']).getTime()/1000);
    req.files.forEach(json=>{
      switch(json.fieldname){
        case 'main_img_path':
          req.body['main_img_path'] =json.filename;
          req.body['main_img_real_path'] =json.path.replace(/\\/g,'\\\\');
        break;
        case 'property_img_paths':
          req.body['property_img_paths'] =json.filename;
          req.body['property_img_real_paths'] =json.path.replace(/\\/g,'\\\\');
        break;
        case 'img_paths':
          img_paths.push(json.filename);
          img_real_paths.push(json.path.replace(/\\/g,'\\\\'));
        break;
      };
    });
    req.body['img_paths'] =img_paths.join(',');
    req.body['img_real_paths'] =img_real_paths.join(',');
    req.body['admin_ID'] =req.admin_id;
    req.body['ID']= commen.uuid();
    //sql
    let arrFile=[];
    let arrValue=[];
    for(let name in req.body){
      arrFile.push(name);
      arrValue.push(req.body[name])
    }
    let sql =`INSERT INTO house_table (${arrFile.join(',')}) VALUES ('${arrValue.join("','")}')`;

    req.db.query(sql,err=>{
      if(err){
          res.sendStatus(500);
          console.log(err);
      }else {
          res.redirect('/admin/house');
      }
    })

})

//删除房源信息
admin.get('/delete',(req,res)=>{
  console.log("1");
})
