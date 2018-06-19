const http =require('http');
const url =require('url');
const path =require('path');
const fs =require('fs');
const querystring =require('querystring');
const zlib =require('zlib');
const event =require('./libs/Router')
const routers =require('./router');

const cluster =require('cluster');
const os =require('os');
const process =require('process');


if(cluster.isMaster){
  for(let i=0;i<os.cpus().length;i++){
    cluster.fork();
  }
}else {

  http.createServer((req,res)=>{
      let {query,pathname} =url.parse(req.url,true)
      // console.log(url.parse(req.url,true));
      // 判断是否是一个接口
      // console.log(pathname);
      req.query =query;
      res.send =function (data) {
          if(!(data instanceof Buffer)&&(typeof data !="string")){
              data =JSON.stringify(data);
          }
          res.write(data);
          res.end();
      }
      if(false==event.emit(pathname,req,res)){
        //判断是否是一个文件
        let rs =fs.createReadStream(`./www/${pathname}`);
        let gz =zlib.createGzip();
        res.setHeader('Content-Encoding','gzip')
        console.log(process.pid);
        rs.pipe(gz).pipe(res);
        rs.on('error',()=>{
          res.setHeader('Content-Encoding','text')
          res.writeHeader(404);
          res.send("你要找的东西飞走");
          console.log("1");
        })
      }else {

      }

  }).listen(8080);
}
