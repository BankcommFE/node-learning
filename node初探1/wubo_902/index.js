const path = require('path');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const statistic = require('./middleware/statistic').statistic

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, "view"))

let count = 0;
app.get('/table/index', (req, res) => {
    // console.log(req.query)
    // 参数名称&格式 {name: abc, age: 18}
    count++;
    const query = req.query
    res.render('index', {title: '表格', data: query})
})

app.get('/statistic', (req, res) => {
    res.send((count) + '');
})

app.all('*', function(req,res){
    res.send('404');
});

app.listen(3000, () => {
    console.log('listening port on 3000');
});