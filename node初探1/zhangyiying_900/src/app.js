const createError = require('http-errors');
const express = require('express');
const path = require('path');

const appRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use((req,res,next)=>{
    let error = createError(404);
    next(error);
});

// error handler
app.use((err,req,res,next)=>{
    res.status(404).render('error');
});


app.listen(3000,()=>{
    console.log('server success!');
});