var express = require('express');
var router = express.Router();

var requestNum = {num: 0}




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
