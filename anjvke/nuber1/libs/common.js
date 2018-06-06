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
exports.parseInfo =function(str){
  // console.log(str.toString());
    let arr2 =[];
    let json ={};
// console.log(info.toString());
    let arr =str.split('; ');
    // console.log(arr.map(a=>a.toString()));
    arr.forEach(itam=>{
      // console.log(itam.toString());
      let a =itam.split('\r\n');
      // console.log(a.map(b=>b.toString()));
      arr2=arr2.concat(a);
      // console.log(arr2.map(b=>b.toString()));
        arr2.forEach(s=>{
          let [key,val] =s.split('=')
          if(key=="filename"){
            val =val.toString().replace(/\"|\'/g,"")
          }

          // // console.log(val.toString());
          //   console.log(key.toString(),val.toString());
            json[key]=val;
        })
    });
    // console.log(json);
      return json;
}
