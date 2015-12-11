'use strict';

// require('babel-register');

var express = require('express'),
	app = express(),
	path = require('path'),
	passport = require('passport'),
	GithubStrategy = require('passport-github').Strategy,
	logger = require('morgan'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	nodemailer = require('nodemailer'),
	Parse = require('parse').Parse,
  config = require('./config');

var dirPath = path.join(__dirname, '../public');

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

app.use(express.static(dirPath));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GithubStrategy({
	clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.URL+"/auth/github/callback",
}, function(token, tokenSecret, profile, done){

	profile = profile._json;

	Parse.initialize(config.APPLICATION_ID, config.JAVASCRIPT_KEY);

	var Candidate = Parse.Object.extend("Candidate");
	var query = new Parse.Query(Candidate);

	query.equalTo("github", profile.login);

	query.first({
	  	success: function(user) {
  			if (user) {
  				done(null, user);
  			}
  			else{
  				addCandidate()
  			}
	  	},
	  	error: function(user, error) {
	  		done(error, user);
	  	}});

	function addCandidate(){
		var candidate = new Candidate();

		candidate.set('name', profile.name);
		candidate.set('github', profile.login);
		candidate.set('email', profile.email || "");
		candidate.set('provider', 'github');

		candidate.save(null, {
			success: function(user){
				done(null, user);
			},
			error: function(user, err){
				done(err, user);
			}
		});}
}));

app.get('/auth/github', passport.authenticate('github'), function(){});

function callback(req, res) {
    req.session.user = req.user;
    res.redirect('/#/register');
}

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/error' }), callback);

app.get('/api/users/me', function(req, res){
	var user = req.session.user;
	res.send(user).status(200);
});

app.post('/api/users/register', function(req, res){
	var newCandidate = req.body.user;
	var Candidate = Parse.Object.extend("Candidate");
	var query = new Parse.Query(Candidate);

	query.equalTo("github", newCandidate.github);

	query.first({
	  	success: function(user) {
			user.save(null, {
				success: function(updateUser){
					updateUser.set('passInterview', false);
					updateUser.set('interviewed', false);

					updateUser.set('job', newCandidate.job);
					updateUser.set('email', newCandidate.email);
					updateUser.set('company', newCandidate.company);
					updateUser.set('session', newCandidate.session);
					updateUser.set('isFreelance', newCandidate.isFreelance);
					updateUser.set('programmingLanguage', newCandidate.programmingLanguage);

					updateUser.save();

					processEmail(req, res, req.session.user);

					// remove the current user from the session
					req.session.user = null;
					res.send({message: 'saved', user: user}).status(200);
				},
				error: function(user, err){
					res.send({message: 'user not saved'}).status(500);
				}
			});
	  	},
	  	error: function(user, error) {
	  		res.send({message: 'user not saved'}).status(500);
	  	}
	});
});


function processEmail(req, res, user){
  	var mailOptions = {
		from: 'Philos Bootcamp', // sender address
		to: user.email,
		subject: 'Welcome to Philos Lab!',
		html: "<p>Hey "+user.name+", Thank you for applying for our bootcamp! You're about to experience something unique.</p>"+
			"<p>We will contact you shortly by e-mail to set-up the In-person interview. The interview will last around 15 min.</p>"+
			"<b/><p>Philos Team</p>"
	};
  	sendEmail(req, res, mailOptions);
}

function sendEmail(req, res, options, callback){

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'ping@philos.io',
			username: 'Philos Bootcamp',
			pass: 'getbetter'
		}
	});

	// send mail with defined transport object
	transporter.sendMail(options, function(error, info){
		if(error){
			// console.log(error);
      // should catch error here and redirect the user to the main page
		}else{
        if (callback) callback();
      // should catch error here and redirect the user to the main page
		}
	});
}

app.listen(config.PORT);

exports = module.exports = app;
