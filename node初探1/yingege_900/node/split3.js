/**
 * Created by yxw on 2018/6/11.
 */
var sqlite3 = require('sqlite3').verbose();
var sql;
const fs=require('fs');
let sql_name='uese_info.db';
/**
 * 创建sqlite3数据库，用来存放所有图片和点位的数据。
 */
// console.log(fsExistsSync(sql_name))
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
let db = new sqlite3.Database('./'+sql_name);
sql=db;
exports.sql=sql;
if (fsExistsSync(sql_name)==false){
    // console.log('aaaa')
    db.run("CREATE TABLE user_infomation (id integer PRIMARY KEY,userName text,userPassword text)",function () {
        console.log('创建表格成功了！')
    });
}

