var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))

//配置中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))
app.use(router)

app.listen(3000,function(){
    console.log('crub-express running.....');
})
