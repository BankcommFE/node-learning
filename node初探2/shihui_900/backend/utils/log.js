const fs = require('fs');
const path = require('path');

function writeLog(writeStream, log) {
    writeStream.write(log + '\n');
}

// 生成writeStream
function createWS(fileName) {
    let fullFileName = path.join(__dirname, '../', 'logs', fileName);
    let writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream;
}
const myWriteStream = createWS('record.log');

function myLog(log) {
    writeLog(myWriteStream, log);
}

module.exports = {
    myLog
}