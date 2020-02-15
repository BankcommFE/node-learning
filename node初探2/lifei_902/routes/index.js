var express = require('express');
var router = express.Router();
var  fs = require("fs")


var requestNum = {num: 0}

/* GET home page. */
router.get('/cors', function(req, res, next) {
  var  logPath= __dirname + '/../log/record.log'
  var ua = req.headers["user-agent"] + "\n"
  fs.stat(logPath, function (err, stats) {
    if (err) {
      fs.writeFile(logPath, ua,  'utf8',function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('写入成功');
    })
     
    } else  {
     
    fs.appendFile(logPath,   ua  ,function(error){
      if(error){
          console.log(error);
          return false;
      }
      console.log('写入成功');
  })
    }
   res.send("")
})
 
});




/* GET home page. */
router.get('/table/index.html', function(req, res, next) {
  requestNum.num += 1
  var data = []
  console.log(1)
  console.log(1)
  if (req.query.data) {
      data= JSON.parse(req.query.data)
  }

  var titleArr = Object.keys(data[0])
  res.render('index', { title: 'Express' , data: data, titleArr: titleArr});
});

router.get('/statistic', function(req, res, next) {
    console.log(123)
    var result = JSON.stringify({num: requestNum.num})
    console.log(result)
    res.send(result)
});

router.get('/favicon.ico', function(req, res, next) {
  
  console.log(1)
});


module.exports = router;
