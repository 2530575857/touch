const express =require('express');
const fs =require('fs');

const config =require('../config');
const commen =require('../libs/commen');

let admin =express.Router();
module.exports = admin;
//登陆检验
admin.use((req,res,next)=>{
  if(!req.cookies['admin_token']&&req.path!='/login'){
      res.redirect(`/admin/login?ref=${req.url}`);
  }else {
      if(req.path=='/login'){
          next();
      }else {
          req.db.query(`SELECT * FROM admin_token_table WHERE ID='${req.cookies['admin_token']}'`,(err,data)=>{
              if(err){
                  res.sendStatus(500);
                  console.log(err);
              }else if(data.length==0){
                  res.redirect(`/admin/login?ref=${req.url}`)
              }else {
                  req.admin_id =data[0].admin_ID;
                  next();
              }
          })
      }
  }
});

//登陆界面
admin.get('/login',(req,res)=>{
  res.render('login',{error:'', ref:req.query['ref']||''})
});
//提交信息
admin.post('/login',(req,res)=>{
  let {user,pass}=req.body;
  if(user==config.root_user){
    if(commen.md5(pass) ==config.root_pass){
        console.log("超级管理员登陆成功");
        // req.session.cookie_id =  1;
        fn_token(1);
        // res.cookie('cookie_id',1,{signed:true,maxAge:1200000});
        // res.redirect('/admin/');
    }else {
        console.log("超级管理员登陆失败");
        return_key("用户名或密码输入错误");
    }
  }else {
        req.db.query(`SELECT * FROM admin_table WHERE username='${user}'`,(err,data)=>{
          if(err){
            console.log(err);
            return_key('数据库出错，请稍后再试')
          }else if(data.length ==0){
            return_key('用户名或密码输入错误')
          }else {
            if(data[0].password==commen.md5(pass)){
              console.log("管理员登陆成功");
              // req.session.cookie_id =data[0].ID;
              fn_token(data[0].ID);
              // res.cookie('cookie_id',data[0].ID,{signed:true,maxAge:1200000});
              // res.redirect('/admin/');
            } else {
              console.log("管理员登陆失败");
              return_key('用户名或密码输入错误')
            }
          }
        });
  }
  function return_key(e) {  //页面返回属性函数
    res.render('login',{error:e , ref:req.query['ref']||''});
  }
  function fn_token(admin_id){ //表admin_token_table
    let ID =commen.uuid();

    let odate =new Date();
    odate.setMinutes(odate.getMinutes()+20);
    let t =Math.floor(odate.getTime()/1000);
    req.db.query(`INSERT INTO admin_token_table (ID,admin_ID,expires) VALUES ('${ID}','${admin_id}',${t})`,err=>{
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else {
          res.cookie('admin_token',ID);//,{maxAge: 6000000000}
          let ref =req.query['ref'];
          if(!ref){
              ref=''
          }
          res.redirect(`/admin${ref}`);
        }
    })
  };
});

//admin 根目录
admin.get('/',(req,res)=>{
    res.redirect('/admin/house');
});
//后台主页
//获取房屋信息
admin.get('/house',(req,res)=>{
  //分页
  let nunber=9;
  let pageing =req.query.page;//当前页
  if(!pageing){
    pageing=1;
  }else if (!/^[1-9]\d*$/.test(pageing)) {
    pageing=1;
  }
  let kais =(pageing-1)*nunber;//页码

  //查询
  let link_seg="1=1"
  if(req.query.keywords){
    let keys =req.query.keywords.split(/\s+/g);
    link_seg =keys.map(itam=>`title LIKE '%${itam}%'`).join(' OR ')
  };

  req.db.query(`SELECT * FROM house_table WHERE ${link_seg} LIMIT ${kais},${nunber}`,(err,data)=>{
    if(err){
      res.sendStatus(500);
      console.log("数据库查询错误");
    }else {

      req.db.query(`SELECT COUNT(*) AS s FROM house_table WHERE ${link_seg}`,(err,page)=>{
        if(err){
          res.sendStatus(500);
          console.log("数据库查询错误");
        }else {
          res.render('index',{
            data,
            cur_page:parseInt(pageing),
            total_page:Math.ceil(page[0].s/nunber),
            show_page_count:9,
            search:req.query.keywords
          });
        }
      })

    }
  })

});
//添加房屋信息
admin.post('/house',(req,res)=>{
  req.body['sale_time'] =Math.floor(new Date(req.body['sale_time']).getTime()/1000);
  req.body['submit_time'] =Math.floor(new Date(req.body['submit_time']).getTime()/1000);

  if(req.body.alter){
    let data =req.body;
    if(!data.id){
      res.sendStatus(404);
    }else if (!/^[\d a-f]{32}$/.test(data.id)) {
      res.sendStatus(404);
    }else {
      let arr =['title','sub_title','position_main','position_second','ave_price','area_min','area_max','tel','sale_time','submit_time','building_type','property_types'];//可修改字段
      let arr_val=arr.map(itam=>`${itam}='${data[itam]}'`);
      let sql=`UPDATE house_table SET ${arr_val.join(',')} WHERE ID ='${data.id}'`;
      req.db.query(sql,err=>{
        if(err){
          res.sendStatus(500);
          console.log('修改错误');
        }else {
          res.redirect('/admin/house');
        }
      })
    }
  }else {
    let img_paths =[];
    let img_real_paths=[];
    let property_img_paths=[];
    let property_img_real_paths=[];

    req.files.forEach(json=>{
      switch(json.fieldname){
        case 'main_img_path':
          req.body['main_img_path'] =json.filename;
          req.body['main_img_real_path'] =json.path.replace(/\\/g,'\\\\');
        break;
        case 'property_img_paths':
          property_img_paths.push(json.filename);
          property_img_real_paths.push(json.path.replace(/\\/g,'\\\\'));
        break;
        case 'img_paths':
          img_paths.push(json.filename);
          img_real_paths.push(json.path.replace(/\\/g,'\\\\'));
        break;
      };
    });
    req.body['img_paths'] =img_paths.join(',');
    req.body['img_real_paths'] =img_real_paths.join(',');
    req.body['property_img_paths'] =property_img_paths.join(',');
    req.body['property_img_real_paths'] =property_img_real_paths.join(',');
    req.body['admin_ID'] =req.admin_id;
    req.body['ID']= commen.uuid();
    //sql
    let arrFile=[];
    let arrValue=[];
    for(let name in req.body){
      arrFile.push(name);
      arrValue.push(req.body[name])
    }
    let sql =`INSERT INTO house_table (${arrFile.join(',')}) VALUES ('${arrValue.join("','")}')`;

    req.db.query(sql,err=>{
      if(err){
          res.sendStatus(500);
          console.log(err);
      }else {
          res.redirect('/admin/house');
      }
    })
  }

})
//删除房源信息
admin.get('/house/delete',(req,res)=>{
  //删除资源文件
  let ID =req.query['id'];
  let arr_imgsrc =[];
  req.db.query(`SELECT main_img_real_path,img_real_paths,property_img_real_paths FROM house_table WHERE ID='${ID}'`,(err,data)=>{
    if(err){
      res.sendStatus(500);
      console.log('数据库错误');
    }else if(data.length==0){
      res.sendStatus(404,'文件地址错误...')
    }else {
      let datas_length=0;
      for(let name in data[0]){
        // console.log(data[0][name].split(','));
        arr_imgsrc=arr_imgsrc.concat(data[0][name].split(','))
      }
        // console.log(arr_imgsrc);
      arr_imgsrc.forEach(itam=>{//这里可以用递归比较好 防止并发

        fs.unlink(itam,err=>{
          if(err){
            throw  err;
            res.sendStatus(500);
            console.log('文件删除错误');
          }else {
            console.log('删除资源文件成功');
            datas_length++

            //判断文件全部文件是否全部删除完成
            if(datas_length==data.length){
              //删除数据库信息  如果有关联信息 先删除关联信息
              req.db.query(`DELETE FROM house_table WHERE ID ='${ID}'`,err=>{
                  if(err){
                    throw err;
                    res.sendStatus(500);
                  }else {
                    res.redirect('/admin/house');
                  }
              })
            }

          }
        })
      });

    }

  })

})

//修改房源信息
admin.get('/house/alter',(req,res)=>{
    let data_id =req.query.id;
    if(!data_id){
      res.sendStatus(404);
    }else if (!/^[\d a-f]{32}$/.test(data_id)) {
      res.sendStatus(404);
    }else {
      req.db.query(`SELECT * FROM house_table WHERE ID='${data_id}'`,(err,data)=>{
        if(err){
          res.sendStatus(500);
          console.log("查询错误");
        }else if (data.length==0) {
          res.sendStatus(404);
        }else {
          res.send(data[0]);
        }
      })
    }
})
