var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static('build'));

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.location('/')
  res.redirect(302, '/');
});

module.exports = app;
