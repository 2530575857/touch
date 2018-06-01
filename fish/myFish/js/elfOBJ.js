class elf{
  constructor(img,x=0,y=0,width,height,angle=0){
    this.img =img;
    this.x =x;
    this.y=y;
    this.w=width;
    this.h=height;
    this.angle =angle;
    this.sx =0;
    this.sy=0;
  }
  draw(gd){
    gd.save();
    gd.translate(this.x,this.y)
    gd.rotate(b2a(this.angle))
    gd.drawImage(
      this.img,this.sx,this.sy,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h
    )
    gd.restore()
  }
}
class fish extends elf{
  constructor(type,x=0,y=0,angle=0){
    const SIZE =[
      null,
      {"w":55,"h":37},
      {"w":78,"h":64},
      {"w":72,"h":56},
      {"w":107,"h":122},
    ];
    super(_imgs[`fish${type}`],x,y,SIZE[type].w,SIZE[type].h,angle)
    //子类
    this.type=type;
    this.MAX_SIZE =4;
    this.curFrame=0;
  }
  nextFrame(){
      this.curFrame++
      if(this.curFrame>=this.MAX_SIZE){
            this.curFrame=0;
      }
      this.sy =this.h*this.curFrame;
  }
}
