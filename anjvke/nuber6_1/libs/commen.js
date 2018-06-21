const crypto =require('crypto');
const uuid =require('uuid/v4');
module.exports = {
  md5(str){
    return crypto.createHash('md5').update(str).digest('hex');
  },
  uuid(){
    return uuid().replace(/\-/g,"");
  }
};
