const express =require('express');
const fs =require('fs');
const ejs =require('ejs');
const zlib =require('zlib');
const path =require('path');

let router_user =express.Router();

router_user.get('/register',function (req,res) {
  fs.stat(`./render_cache/user${req.url}`,(err,stat)=>{
    if(err||(Date.parse(new Date())-(1000*60*10))>Date.parse(stat.ctime)){
      console.log("一分钟到了");
      renderAndWrite();
    }else {
      let rs =fs.createReadStream(`./render_cache/user${req.url}`);
      res.setHeader('content-Encoding','gzip')
      let zip =zlib.createGzip();
      rs.pipe(zip).pipe(res)
    }
  })
  function renderAndWrite(){
      ejs.renderFile(`./template/${req.url}.ejs`,{a:200},(err,data)=>{
        if(err){
            console.log("生成静态文件出错了"+err);
        }else {
          fs.writeFile(`./render_cache/user${req.url}`,data,err=>{
            if(err){
              console.log('写入文件出错');
            }
            res.send(data);
            res.end();
          })
        }
      })
  }
})  //给出注册页面
router_user.post('/register',function (req,res) {
  console.log(req.files);
  console.log(req.body);
  let i =0
  fsname(i)
  function fsname(n) {
    fs.rename(`./${req.files[n].path}`,`./uploads/${req.files[n].filename}.${path.extname(req.files[n].originalname)}`,(err)=>{
      if(err){
          console.assert("修改名字出现错误"+err);
      }else {
          i++
          if(i<req.files.length){
              fsname(i)
          }else {
              console.log("改名完成");
          }
      }
    })
  }

})  //进行上传文件操作


router_user.use('/vip',require('./vip'));//路由
module.exports = router_user;
