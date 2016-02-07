'use strict';

require('babel-register');

// express
let app = require('express')();

// let passport = require('passport');
// let config = require('./config');

let port =  process.env.PORT || 8000;
// configuration of passport
// require('./passport')(passport);
require('./express')(app);
// require('./routes')(app, passport);

app.listen(port, ()=>{
  console.log(`The app is running on port: ${port}`);
});

exports = module.exports = app;
