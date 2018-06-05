const http =require('http');
const url =require('url');
const querystring =require('querystring');
const common =require('../libs/common');
let server= http.createServer((req,res)=>{
    let {pathname,query} =url.parse(req.url,true);

    const contentType="--"+req.headers['content-type'].split('; ')[1].split('=')[1];
    //post 方式
    let aBuffer=[];
    let post=null;
    req.on('data',data=>{
        aBuffer.push(data);
    });
    req.on('end',()=>{
      let data= Buffer.concat(aBuffer);//拼接Buffle
      if(req.headers['content-type'].indexOf('multipart/form-data')==0){
      //form-data
      let arr=data.split(contentType);
      arr.pop();
      arr.shift();
      arr=arr.map(itam=>itam.slice(2,itam.length-2))

// console.log(arr.map(a=>a.toString()));

      arr.forEach(itam=>{
        var n=itam.indexOf('\r\n\r\n');
        let info =itam.slice(0,n);
        let data =itam.slice(n+4)
        if(info.indexOf('/r/n')==-1){
            let key =common.parseInfo(info);
            console.log(key);
            // let val =data.toString();
        }else {

        }
      })

      // console.log(data.toString());

      }else {
        //url
      post=querystring.parse(data.toString());
      }

    });

});
server.listen(8080);
