const express =require('express');
const fs =require('fs');
const ejs =require('ejs')

let router_user =express.Router();

// let tiem =0;
let i=0;
router_user.get('/index',(req,res)=>{
  // res.render('index',{arr:[1515,5465,654,456],foot:'<div>共用dom<div>'})
  // res.send("vip");
  //
//静态化
fs.stat(`./render_cache/user/index`,(err,stat)=>{
  if(err||(Date.parse(new Date())-(1000*60*10))>Date.parse(stat.ctime)){//ctime   //十分钟刷新一次  静态文件
    console.log("一分钟到了");
    renderAndWrite()
  }else {
    let rs =fs.createReadStream(`./render_cache/user/index`);
    rs.pipe(res);
    rs.on('error',err=>{
      // console.log('cuole');
        renderAndWrite()
    })
  }

  function renderAndWrite(){
    ejs.renderFile('./template/index.ejs',{arr:[1515,5465,654,456],foot:'<div>'+(i++)+'<div>'},(err,data)=>{
      fs.writeFile(`./render_cache/user/index`,data,err=>{
        if(err){
          console.log("写入文件出错");
        }else {
          res.send(data);
          res.end();
        }
      })
    })
  }

})

})



router_user.use('/vip',require('./vip'))
module.exports =router_user;
