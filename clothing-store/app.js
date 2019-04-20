var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/productsAPI');

var bodyParser = require('body-parser');
var app = express();
var mongoose= require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.db_user_name}:${process.env.db_password}@cluster0-skahm.mongodb.net/clothing-store-db?retryWrites=true`, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', (err)=>{
  console.error(`connection error:${err}`);
});
console.log('connected');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/products', productsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({'status' : 'error'});
});

module.exports = app;