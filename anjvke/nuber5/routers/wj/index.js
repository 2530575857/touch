const express =require('express');

let router_wj =express.Router();
router_wj.get('/',(req,res)=>{
  res.send('wj');
  res.end();
})
module.exports = router_wj;
