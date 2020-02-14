const fs = require('fs');

// 日志文件命名，用年月日来命名区分
const getLogFileName = () => {
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth();
    let day = date.getDate();

    return `./Logs/${year}-${month}-${day}.txt`;
}

const writeLog = (info) => {
    const fileName = getLogFileName();
    const wirteStr = `time: ${Date.now()}, path: ${info.path},  query: ${JSON.stringify(info.query)}, params: ${JSON.stringify(info.params)}, UA: ${info.get('user-agent')} \r\n `
    fs.exists(fileName, (exists) => {
        if (exists) {
            fs.appendFile(fileName, wirteStr, (err) => {
                // console.log('append', err)
            })
        } else {
            fs.writeFile(fileName, wirteStr, (err) => {
                // console.log('add', err)
            })
        }
    })
}

module.exports = {
    write() {
        return function(req, res, next) {
            writeLog(req);
            next()
        }
    }
}