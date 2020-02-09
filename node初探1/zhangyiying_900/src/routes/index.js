const cookieParser=require("cookie-parser");
const express = require('express');
const router = express.Router();

router.use(cookieParser());

// get table page
router.get('/table/index.html', function(req, res, next) {
    let data = [];
    if (req.query.data) {
        data= JSON.parse(req.query.data)
    }
    var titleArr = Object.keys(data[0]);
    if(!!req.cookies.visit){
        res.cookie('visit',Number(req.cookies.visit)+1,{maxAge: 900000000000, httpOnly: true});
    }else{
        res.cookie('visit',1,{maxAge: 900000000000, httpOnly: true});
    }
    res.render('table', { title: '表格' , data: data, titleArr: titleArr});
    
});

// get statistic
router.get('/statistic', function(req, res, next) {
    let visit = !!req.cookies.visit?req.cookies.visit:0;
    res.json({
        '表格访问次数':visit
    })
});

module.exports = router;