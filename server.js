var express = require('express'),
	app = express(),
	path = require('path'),
	passport = require('passport'),
	LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
	GithubStrategy = require('passport-github').Strategy,
	mongoose = require('mongoose'),
	logger = require('morgan'),
	session = require('express-session'),
	methodOverride = require('method-override')
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');

var LINKEDIN_CLIENT_ID = "75iyqka5jb09rh";
var LINKEDIN_CLIENT_SECRET = "vYpKoOS3P2spIMgR";

var GITHUB_CLIENT_ID = process.env.NODE_ENV === 'production'? process.env.GITHUB_CLIENT_ID: "f344a987c3d87a83b193";
var GITHUB_CLIENT_SECRET = process.env.NODE_ENV === 'production'? process.env.GITHUB_CLIENT_SECRET :"7a814ebd607af91f1e36392ba79d097815bb5082";


var port = process.env.PORT || 9000;
var db = process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/bootcamp';
var url = process.env.NODE_ENV === 'production'? 'admission.philos.io': 'localhost:9000';


var dirPath = path.join(__dirname, '/');

var UserSchema = mongoose.Schema({
	name: {type: String, require: true},
	jobTitle: {type: String, require: false},
	company: {type: String, require: false},
	session: {type: String, require: false},
	registered: {type: Boolean, require: false},
	programmingLanguage: {type: String, require: false},
	github: {type: String, require: false},
	email: {type: String, require: true},
	provider: [String]
});

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


var User = mongoose.model('User', UserSchema);

//var db = mongoose.connect(db);

passport.use(new GithubStrategy({
	clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://"+ url +"/auth/github/callback"
}, function(token, tokenSecret, profile, done){

	profile = profile._json;
	

	done(null, profile);
	// User.findOne({email: profile.email}, function(err, user){
	// 	process.nextTick(function () {		
	// 		if (err) {
	// 			done(err, user);
	// 			throw err;
	// 		}

	// 		if (user) {			
	// 			done(null, user);
	// 		}else{
	// 			var user = new User();
	// 			user.name = profile.name;
	// 			user.github = profile.login;
	// 			user.email = profile.email;
	// 			user.provider.push('github');

	// 			user.save(function(err){
	// 				if (err) {
	// 					throw err;
	// 				}
	// 				done(null, user);
	// 			});
	// 		}
	// 	});
	// });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/github', passport.authenticate('github'), function(){

});

function callback(req, res) {
	console.log(req.user, 'inside callback');
	var login = req.user.github;
    res.redirect('/#/register/?user='+login);}

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/error' }), callback);

app.get('/auth/linkedin',passport.authenticate('linkedin', {state: 'philos lab'}));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/register' }),
	function(req, res) { 
		res.redirect('/register');	
	}
);

app.post('/api/users', function(req, res){
	console.log(req.body);

	// User.findOne({github: req.body.username }, function(err, user){
	// 	if (err) {
	// 		done(err);
	// 		throw err;
	// 	}
	// 	console.log(user);
	// 	res.send(user).status(200);
	// });

	res.send({github: 'davyengone', name:' Davy Engone'}).status(200);
});

app.post('/api/users/register', function(req, res){

	var newUser = req.body.user;

	// User.findOne({github: newUser.github }, function(err, user){
	// 	if (err) {
	// 		done(err);
	// 		throw err;
	// 	}

	// 	user.company = newUser.company;
	// 	user.job = newUser.job;
	// 	user.programmingLanguage = newUser.programmingLanguage;
	// 	user.session = newUser.session;
	// 	user.registered = true;

	// 	user.save(function(err){
	// 		if (err) {
	// 			res.send({message: 'not saved', user: user}).status(500);
	// 		}

	// 		res.send({message: 'saved', user: user}).status(200);
	// 	})
		
	

	// });

	res.send({message: 'saved', user: user}).status(200);
});

app.listen(port);

exports = module.exports = app;