const http =require('http');
const url =require('url');
const querystring =require('querystring');
let server= http.createServer((req,res)=>{
    let {pathname,query} =url.parse(req.url,true);
    console.log(req);
    //post 方式
    let aBuffer=[];
    req.on('data',data=>{
        aBuffer.push(data);
    });
    req.on('end',()=>{
      let data= Buffer.concat(aBuffer)
      console.log(querystring.parse(data.toString()));
    });
});
server.listen(8080);
