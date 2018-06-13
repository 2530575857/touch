const express =require('express');

let router_vip =express.Router();
router_vip.get('/',(req,res)=>{
  // res.render('index',{arr:[1515,5465,654,456]})
  res.send("vip");
  res.end();
})
module.exports =router_vip;
