var express = require('express');
var sql = require('mysql');
var app = express();
var bp = require('body-parser');
var conf = require('./config/conf');
var insert = require('./functions/insert');
var moment = require('moment');
const { check, validationResult } = require('express-validator/check');
var server = conf.server;
var database = conf.database;
app.use(bp.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var con = sql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.name
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Host: "+database.host);
  console.log("Database User: "+database.user);
  console.log("Database Name: "+database.name);
});
app.get('/', function(req, res){
  res.render('index');
})
app.post('/', [check('email').isEmail(), check('name').isLength({min: 3})], function(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.send(500);
  } else {
    var query = insert("newsletter", ["name", "email"], [req.body.name, req.body.email]);
    con.query(query, function(err, response){
      if (err) {
        console.log("err",err);
      } else {
        console.log("res", response);
      }
    })
    res.send(200);
  }
})
app.listen(server.port, function(){
  console.log("Application: "+ server.name);
  console.log("Port: "+ server.port);
})
