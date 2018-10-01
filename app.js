"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
app.use(express.static('public')); // public
app.use(session({
  secret: 'letsstudygraphql!',
  resave: false,
  saveUninitialized: true,
})); // session
app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({extended:false}));

/* ejs */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.get('/',function(req,res){
  res.render('./index');
});

app.get('/join',function(req,res){
  res.render('./join');
});

app.post('/join',function(req,res){
  //res.render('./join');
});

app.get('/login',function(req,res){
  res.render('./login');
});

app.get('/board',function(req,res){
  res.render('./board');
});

app.listen(3000,function(){
  console.log(`Connect 3000 port!`)
});
