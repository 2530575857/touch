const http =require('http');
const url =require('url');
const querystring =require('querystring');
let server= http.createServer((req,res)=>{
    let {pathname,query} =url.parse(req.url,true);
    console.log(pathname,query);
});
server.listen(8080);
