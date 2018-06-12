const fs =require('fs');

module.exports = function(req,res,next){
    let arr=[];
    arr.push(req.connection);
    let date =new Date();
    arr.push('['+date.toGMTString()+']');

    arr.push(req.method);

    arr.push(req.url);

    fs.appendFile('./logs/1.txt',arr.join(" ")+'\n',(err)=>{
        if(err){
            console.log("日志写入错误"+err);
        }
        next();
    })

};
