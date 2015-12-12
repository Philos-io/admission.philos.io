'use strict';

let nodemailer = require('nodemailer');
let config  = require('./config');

let sendEmail = (req, res, options, callback) => {;

  let transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.authorisation
  });

  transporter.sendMail(options, (error, info)=>{
    if(error){
      // console.log(error);
      // should catch error here and redirect the user to the main page
    }else{
      if (callback) callback();
      // should catch error here and redirect the user to the main page
    }
  });
}

exports.processEmail = (req, res, user) => {

  let mailOptions = {
    from: config.email.from,
    to: config.email.to(user.email),
    subject: config.email.subject,
    html: config.email.message(user.name)
  };

  sendEmail(req, res, mailOptions);
}


