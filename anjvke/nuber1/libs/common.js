Buffer.prototype.split=Buffer.prototype.split||function(spliter){
  let Buffer1 =this;
  let result =[];
  let n
  while((n =Buffer1.indexOf(spliter))!=-1){
    let res1 =Buffer1.slice(0,n);
    let res2 =Buffer1.slice(n+spliter.length);
    result.push(res1);
    Buffer1=res2;
  }
  result.push(Buffer1);
  return result;
}
exports.parseInfo =function(info){
    let json ={};
    let arr =info.split(/(; )|(\r\n)/g);
    console.log(arr);
    // arr.forEach(itam=>{
    //   let [key,val] =itam.split('=')
    //     // console.log(itam.split('=').map(a=>a.toString()));
    //   json[key]=val;
    // });
    // return json;
}
