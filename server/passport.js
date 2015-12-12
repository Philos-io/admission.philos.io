'use strict';

// Get the configuration file
let config  = require('./config');
let Parse = require('parse/node').Parse;
let GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new GithubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: `${config.URL}/auth/github/callback`,
  }, function(token, tokenSecret, profile, done){

    profile = profile._json;

    Parse.initialize(config.APPLICATION_ID, config.JAVASCRIPT_KEY);

    let Candidate = Parse.Object.extend('Candidate');
    let query = new Parse.Query(Candidate);

    query.equalTo('github', profile.login);

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
        let candidate = new Candidate();

        candidate.set('name', profile.name);
        candidate.set('github', profile.login);
        candidate.set('email', profile.email || '');
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
}
