let _imgs =null;
const resource ={//加载资源函数
  "fish1":"img/fish1.png",
  "fish2":"img/fish2.png",
  "fish3":"img/fish3.png",
  "fish4":"img/fish4.png",
}
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
