const express = require('express');
const router = express.Router();
const multer = require('multer')
var morgan = require('morgan');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        // 指定文件路径
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        // 指定文件名
        let txts = file.originalname.split('.');
        let txt = txts[txts.length-1];
        let time = (new Date()).getTime()+parseInt(Math.random()*9999);
        cb(null,`${time}.${txt}`)
    }
})

var upload = multer({
    storage: storage
})

router.post('/upload',upload.single('imgUrl'),(req,res,next)=>{
    let {size,mimetype,path} = req.file;
    let types= ['jpg','png','jpeg','gif']
    let tmpType = mimetype.split('/')[1];
    if(size>500000){
        return res.send({err:-1,msg:"图片尺寸不能超过500k"})
    }else if(types.indexOf(tmpType)== -1){
        return res.send({err:-2,msg:"图片格式不支持"})
    }else{
        let url = `/public/images/${req.file.filename}`
        res.json({err:0,msg:"上传成功  message from cors!",imgUrl:url})
    }
})

module.exports = router;