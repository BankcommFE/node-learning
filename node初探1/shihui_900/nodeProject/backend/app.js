var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

var indexRouter = require('./routes/index');
var tableDataRouter = require('./routes/tableData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 日志
const ENV = process.env.NODE_ENV;
if (ENV !== 'prd') {
  app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'ShiHui%_666',
  cookie: {
    path: '/', // 默认配置可以不写
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 *1000
  }
}));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// app.use((req, res, next) => {
//   console.log('请求开始.1..', req.method, req.url);
//   next();
// })

// app.use((req, res, next) => {
//   // 假设在处理cookie
//   req.cookie = {
//     userId: 'abc123'
//   }
//   next();
// })

// app.use((req, res, next) => {
//   // 假设处理postdata
//   // 异步
//   setTimeout(() => {
//     req.body = {
//       a: 100,
//       b: 200
//     }
//     next()
//   })
// })

app.use('/', indexRouter);
app.use('/tableData', tableDataRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  console.log('处理404');
  res.render('404', {
      title: 'No Found'
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
