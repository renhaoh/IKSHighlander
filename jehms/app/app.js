var http = require('http');
var express = require('express');
var logger = require('morgan');
var db = require('./db');
var app = express();
var session = require('express-session');
var server = http.Server(app);
var bodyParser = require('body-parser');
var dbSessionStore = require('connect-session-knex')(session);

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

var sessionMiddleware = session({
  name: 'session_id',
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 10  // 10 hours
  },
  store: new dbSessionStore({
    knex: db,
    tablename: 'sessions'
  })
});

app.use(sessionMiddleware);
app.use(bodyParser.json());

// establish routes for backend
app.use('/', express.static('./static'));
app.use('/api/home', require('./components/home').routes);
app.use('/api/pre', require('./components/pre').routes);
app.use('/api/post', require('./components/post').routes);
module.exports = { app: app, server: server };