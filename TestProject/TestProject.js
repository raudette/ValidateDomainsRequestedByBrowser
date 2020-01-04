var express = require('express')
var app = express()
var ejs = require('ejs');
var port = 3000
var bodyParser = require('body-parser');

var server = app.listen(port, function () {
    console.log('TestProject Listening At http://localhost:%s',  port)
  })

app.use('/scripts', express.static('scripts'))

app.get('/', function(req, res){
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.render('index.ejs');
  })

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/checkoutcompleted', urlencodedParser, function(req, res){
 
    res.render('checkoutcompleted.ejs', {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      secretaccountnumber: req.body.secretaccountnumber
      });
  })