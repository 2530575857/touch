const express =require('express')

let router_vip =express.Router();

router_vip.get('/',function () {
    console.log("vip");
})

module.exports = router_vip;
