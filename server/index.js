'use strict';

require('babel-register');

// express
let app = require('express')();

let passport = require('passport');
let config = require('./config');


// configuration of passport
require('./passport')(passport);
require('./express')(app, passport);
require('./routes')(app, passport);

app.listen(config.PORT, ()=>{
  console.log(`The app is running on port: ${config.PORT}`);
});

exports = module.exports = app;
