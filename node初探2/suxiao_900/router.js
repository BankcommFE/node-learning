var express = require('express')
var router = express.Router()
var fs = require('fs')
var students = require('./student')
router.get('/students',function(req,res){
    students.find(function(err,student){
        if(err){
            return res.status(500).send('server error.....')
        }
        res.render('index.html',{
            fruits:[
                {'name':'彭于晏','nickname':'校草','src':'/public/img/a.jpg'},
                {'name':'斯嘉丽','nickname':'校花','src':'/public/img/b.jpg'},
            ],
            students:student
        })
    })
})
router.get('/students/new',function(req,res){
    res.render('new.html')
})
router.post('/students/new',function(req,res){
    // console.log('object :', req.body);
    students.save(req.body,function(err,data){
        if(err){
            return res.status(500).send('server error.....')
        }
        res.redirect('/students')
    })

})
router.get('/students/edit',function(req,res){
    // res.render('edit.html')
    students.findByid(req.query.id,function(err,student){
        if(err){
            return res.status(500).send('server error.....')
        }
        res.render('edit.html',{
            student:student
        })
    })
    
})
router.post('/students/edit',function(req,res){
    students.update(JSON.parse(JSON.stringify(req.body)),function(err,data){
        if(err){
            return res.status(500).send('server error.....')
        }
        res.redirect('/students')
    })
})
router.get('/students/del',function(req,res){
    students.del(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error.....')
        }
        res.redirect('/students')
    })
})
module.exports = router