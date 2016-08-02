'use strict';
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const port = process.argv[2] || process.env.port || 8080;

/* View Engine */
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('json spaces', 4);

/* Middleware */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function(req,res){
  res.end('welcome to digital markets');
});

/* Routes */
app.use ('/api', require("./api")() );

app.listen(port, function(){
  console.log(`app listening on port ${port}.`);
});
