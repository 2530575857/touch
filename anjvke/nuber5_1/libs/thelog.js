const fs =require('fs');
 module.exports =function(req,res,next){
   let arr=[];

   arr.push('['+new Date().toGMTString()+']');

   arr.push(req.method);

   arr.push(req.url);

   fs.appendFile(`./logs/${getNowFormatDate()}.txt`,arr.join(" ")+'\n',(err)=>{
     if(err){
         assert(false,"日志写入出错"+err);
         console.log(err);
     }
     next();
   });
   function getNowFormatDate() {
     var date = new Date();
     var month = date.getMonth() + 1;
     var strDate = date.getDate();
     if (month >= 1 && month <= 9) {
         month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
         strDate = "0" + strDate;
     }
     var currentdate = date.getFullYear() + month + strDate;
     return currentdate;
   };
 };
