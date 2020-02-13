//封装回调函数
var fs = require('fs')
var dbpath = './db.json'

//查找学生
exports.find = function(callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        var dataList = JSON.parse(data).students
        var genderStr = {"0":"男","1":"女"}
        dataList.map(function(item){
            item.gender = genderStr[item.gender]
        })
        if(err){
            return callback(err)
        }
        callback(null,dataList);
    })
}

//通过ID查找学生
exports.findByid = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var dataList = JSON.parse(data).students
        var findData = dataList.find(function(item){
            return item.id == id
        })
        callback(null,findData)
    })
}


//增加学生
exports.save = function(student,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        var dataList = JSON.parse(data).students
        if(err){
            return callback(err)
        }
        student.id = dataList[dataList.length - 1].id + 1
        dataList.push(student)
        fs.writeFile(dbpath,JSON.stringify({
            students:dataList
        }),function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        
    })

}
//更新学生
exports.update = function(updateobj,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        var dataList = JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var Index = dataList.findIndex(item => {return item.id == updateobj.id*1})
        dataList[Index] = updateobj
        fs.writeFile(dbpath,JSON.stringify({
            students:dataList
        }),function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        
    })

}
//删除学生
exports.del = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        var dataList = JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var Index = dataList.findIndex(item => {return item.id == id*1})
        dataList.splice(Index,1)
        fs.writeFile(dbpath,JSON.stringify({
            students:dataList
        }),function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        
    })

}


