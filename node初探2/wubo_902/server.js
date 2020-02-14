const app = require('express')();
const cors = require('cors')
const { write } = require('./Middleware/mid_log');

app.use(cors())

// 记录请求信息
app.use(write());

app.get('/', (req, res, next) => {
    res.send('index page')
})

// 测试cors
app.get('/demo', (req, res) => {
    res.json({
        name: 'wu',
        age: 19
    })
})

app.listen(3000, () => {
    console.log('listening port on 3000');
})