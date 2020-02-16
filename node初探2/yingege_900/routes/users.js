var express = require('express');
var router = express.Router();
const User = require('../db/model/userModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/reg',(req,res)=>{
  //获取数据
  let {us,ps} = req.body
  //数据处理
  if(!us || !ps) {
    return res.send({err: -1,msg:'参数错误'})
  }
  User.find({us,ps})
  .then((data)=>{
    if(data.length ===0){
      //用户名不存在，可以注册
      return User.insertMany({us:us,ps:ps})
    }else{
      res.send({err:-3,msg:"用户名已存在"})
    }
  })
  .then(()=>{
    res.send({err:0,msg:"注册成功"})
  })
  .catch((err)=>{
    res.send({err:-2,msg:"注册失败"})
  })
  
})

router.post('/login',(req,res) => {
  let {ps, us} = req.body
  if(!us || !ps) {
    return res.send({err: -1,msg:'参数错误'})
  }
  User.find({us,ps}).then((data)=>{
    if(data.length>0){
      res.send({err:0,msg:"登录成功"})
    }else{
      res.send({err:-2,msg:"用户名或者密码不正确"})
    }
  }).catch((err) => {
    res.send({err:-1,msg:"内部错误"})
  })
})

module.exports = router;
