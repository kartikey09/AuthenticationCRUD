const express = require('express');
const app = express();

function middleware1(req, res, next){
    console.log('i am middleware #1');
    res.end();
}

function middleware2(req, res, next){
    console.log('i am middleware #2');
    next();
}

app.use(middleware2);

app.get('/', (req, res, next) =>{
    res.send('<h1>Hello World</h1>');
    console.log('i am standard middleware')
    next();
}, middleware1);

app.listen(3000);