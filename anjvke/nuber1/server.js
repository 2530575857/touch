const http =require('http');
const url =require('url');
const querystring =require('querystring');
const common =require('../libs/common');
const fs=require('fs');
const uuid =require('uuid/v4');
const path =require('path');
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
          // console.log(info.toString().indexOf('Content-Type')==-1);
          // console.log(data.toString());
        if(info.indexOf('Content-Type')==-1){
            let name =common.parseInfo(info).name;
// console.log(key);
            let val =data.toString();
        }else {
            let json =common.parseInfo(info);
            let name =json.name;
            let filename =json.filename;
            let filepath =`./upload/${uuid().replace(/\-/g,'')}${path.extname(filename.toString())}`;
            console.log(data.toString());
            // fs.writeFile(filepath,data)
            fs.writeFile(filepath, data, function (err) {
            // if (err) throw err;
            console.log(err);
            });


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
