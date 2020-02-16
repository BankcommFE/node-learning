const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/',{ useNewUrlParser: true,useUnifiedTopology: true })

//链接数据库
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('db ok')
})