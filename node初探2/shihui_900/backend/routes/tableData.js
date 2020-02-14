var express = require('express');
var router = express.Router();
let totalNum = 0;
const { exec } = require('../db/mysql');
const { SuccessModel } = require('../model/resModel');

router.get('/getData1', function(req, res, next) {
  // console.log('get请求表格数据...', req.query);
  // let {reqTableData} = req.query;
  // let arr = [];
  // reqTableData.forEach(v => {
  //   arr.push(JSON.parse(v));
  //   console.log(v)
  // })
  // console.log('reqTableData', arr)
  // res.json({
  //   errno: 0,
  //   tableData: arr
  // })
  const name = req.query.name || '';
  const age = req.query.age || '';
  let sql = 'select name,age from userinfo where 1=1 ';
  if(name) {
    sql += `and \`name\` like '%${name}%' `;
  }
  if(age) {
    sql += `and age='${age}' `;
  }
  sql += 'order by createtime desc';
  console.log('ssssssssssssssssssssssssss', sql)
  exec(sql).then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.post('/getData2', function(req, res, next) {
  console.log('post请求表格数据...', req.body);
  const {reqTableData} = req.body;
  res.json({
    errno: 0,
    tableData: reqTableData
  })
});

// session记录个人访问量
router.get('/session-test', (req, res, next) => {
  let session = req.session;
  if(session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  totalNum++;
  res.json({
    viewNum: session.viewNum,
    totalNum: totalNum
  })
})

module.exports = router;
