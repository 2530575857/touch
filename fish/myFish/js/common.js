let _imgs =null;

function b2a(n){
    return n*Math.PI/180
}
function a2b(n){
    return n*180/Math.PI
}
function loadImgs(imgjson,fn){//加载资源函数
  let imgOBJ={};//图片资源对象
  let total =0;
  let complete=0;
  for(let name in imgjson){
    total++
    var img =new Image();
    imgOBJ[name]=img;
    img.onload=function(){
      complete++
      if(total==complete){
        _imgs=imgOBJ;
        fn(imgOBJ)
      }
    }
    img.onerror=function(){
      alert("资源加载失败"+imgjson[name])
    }
    img.src=imgjson[name]
  }
}
