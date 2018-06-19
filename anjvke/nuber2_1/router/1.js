const event = require('../libs/Router');
let mysql ={};
event.on('/logli',(req,res)=>{
  let query =req.query;
  if(mysql[query.user]){
      if(mysql[query.user]==query.pass){
          res.send("登陆成功");
      }else {
          res.send("密码错误");
      }
  }else {
    res.send("用户名不存在");
  }
});
event.on('/landing',(req,res)=>{
  let query =req.query;
  if(!mysql[query.user]){
    if(query.user!=""&&query.pass!=""){
      mysql[query.user]=query.pass;
      res.send("注册成功");
    }else {
      res.send("密码账户不能为空");
    }
  }else {
    res.send("用户名已存在");
  }
});
