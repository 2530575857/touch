const router =require('../libs/Router');

router.on('/logli',(req,res)=>{
  let {user,pass}= req.query;
  res.send({"user":user,"pass":pass})
})
