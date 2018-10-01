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

app.listen(3000,function(){
  console.log(`Connect 3000 port!`)
});
