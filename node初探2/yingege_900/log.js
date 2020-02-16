const fs = require('fs');

const isExit = function(info){
    const recordContent = `time: ${Date.now()}, path: ${info.path},  query: ${JSON.stringify(info.query)}, params: ${JSON.stringify(info.params)}, UA: ${info.get('user-agent')} \r\n `
    fs.exists('./record.log',(exists)=>{
        if(exists){
            console.log('文件已经存在')
            fs.appendFile('./record.log',recordContent,err=> {
                // console.log(err)
            })
        }else{
            fs.writeFile('./record.log',recordContent, err=>{
            })
            console.log('文件不存在11231')
        }
    })
}

module.exports = {
    write() {
        return function(req, res, next) {
            isExit(req);
            next()
        }
    }
}