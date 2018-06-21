const express =require('express');

let www =express.Router();

www.get('/',(req,res)=>{
  console.log("www");
})


module.exports = www;
