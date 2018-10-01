"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const dao = require('./business/dao');

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
  dao.join.joinUser(req.body.id, req.body.pwd)
    .then(result => {
      if(result !== 200) throw { name:'join failed', message:'something wrong' };

      res.render('./index');
    })
    .catch(e => {
      console.log(e.name+':'+e.message)
      res.render('./error', {name: e.name, message: e.message});
    });
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
