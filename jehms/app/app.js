var http = require('http');
var express = require('express');
var logger = require('morgan');
var db = require('./db');
var app = express();
var server = http.Server(app);

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use('/', express.static('./static'));

module.exports = { app: app, server: server };