const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/',{ useUnifiedTopology: true })

//链接数据库
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){

})

var userSchema = new mongoose.Schema({
    us: {type:String,required: true},
    ps: {type:String,required:true},
    age: Number,
    sex:{type:Number,default:0}
})

var User = mongoose.model('user',userSchema)
// User.insertMany({us:'zhangsan',ps:'123',age: 18,sex: 0})
// .then((data) => {
//     console.log(data)
//     console.log('插入成功')
// })
// .catch((err)=> {
//     console.log('插入失败')
// })
