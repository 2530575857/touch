const http =require('http');
const fs =require('fs');
const url =require('url');
const path =require('path');
const querystring =require('querystring');
const zlib =require('zlib');
const router =require('./libs/Router');
const uese =require('./routers/rou');

http.createServer((req,res)=>{
  let {query,pathname} =url.parse(req.url,true);
  //是不是一个接口
  req.query =query;
  res.send =function(data){
      //不能是buffer string
      if(!(data instanceof Buffer)&& (typeof data !='string')){
          data=JSON.stringify(data);
          res.write(data);
          res.end();
      }
  }
  if(false==router.emit(pathname,req,res)){
    //是不是一个文件
    let rs =fs.createReadStream(`www/${pathname}`);
    let gz =zlib.createGzip();
    res.setHeader('Content-Encoding','gzip')
    rs.pipe(gz).pipe(res);
    //读取失败
    rs.on('error',()=>{
        res.setHeader('Content-Encoding','text');
        res.writeHeader(404);
        res.write('没有这个文件');
        res.end();
    })
  }else {

  }

}).listen(8080)
