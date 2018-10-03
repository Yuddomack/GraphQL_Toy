"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const graphqlHTTP = require('express-graphql');
const Graphql = require('graphql');

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

/* graphql */
app.use('/graphql', graphqlHTTP(request => {
  return {
    schema: schema,
    context: request.session,
    graphiql: true,
  }
}));


app.get('/',function(req,res){
  res.render('./index');
});

app.get('/join',function(req,res){
  res.render('./join');
});

app.post('/join',function(req,res){
  dao.join.joinUser(req.body.id, req.body.pwd)
    .then(result => {
      if(result.code !== 200) throw { name:'join failed', message:'something wrong' };

      res.render('./index');
    })
    .catch(e => {
      console.log(e.name+':'+e.message);
      res.render('./error', {name: e.name, message: e.message});
    });
});

app.get('/login',function(req,res){
  if(req.session.user_id) return res.redirect('./board');

  res.render('./login');
});

app.post('/login',function(req,res){
  dao.login.doLogin(req.body.id, req.body.pwd)
    .then(result => {
      if(result.code !== 200) throw { name:'invalid information', message:'please check id, password' };

      req.session.rid = result.rid; // user의 rid
      req.session.user_id = req.body.id;
      req.session.save(() => res.redirect('./board'));
    })
    .catch(e => {
      console.log(e.name+':'+e.message);
      res.render('./error', {name: e.name, message: e.message});
    })
});

app.get('/board',function(req,res){
  res.render('./board', {user_id:req.session.user_id});
});

app.get('/test',function(req,res){
  dao.query('select * from users where @rid = :rid', {
    params: {
      rid: req.session.rid
    }
  }).then(result => console.log(result));
})

app.listen(3000,function(){
  console.log(`Connect 3000 port!`)
});
