'use strict';

let path = require('path');
let express = require('express');
let passport = require('passport');
let	logger = require('morgan');
let session = require('express-session');
let methodOverride = require('method-override');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

module.exports = function(app, passport){

  if(process.env.NODE_ENV !== 'production'){
    app.use(require('cors')());
  }

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'philos rocks bootcamp',
    resave: false,
    saveUninitialized: false
  }));

  let dirPath = path.join(__dirname,'../public');
  app.use(express.static(dirPath));
};
