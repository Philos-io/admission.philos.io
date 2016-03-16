'use strict';

// Get the configuration file
let config  = require('./config');
let Parse = require('parse/node').Parse;
let GithubStrategy = require('passport-github').Strategy;

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GithubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: `${config.URL}/auth/github/callback`,
  }, (token, tokenSecret, profile, done) => {

    profile = profile._json;

    Parse.initialize(config.APPLICATION_ID, config.JAVASCRIPT_KEY);

    let Candidate = Parse.Object.extend('Candidate');
    let query = new Parse.Query(Candidate);

    query.equalTo('github', profile.login);

    query.first({
      success(user){
        if (user) {
          done(null, user);
        }
        else{
          addCandidate()
        }
      },
      error(user, error){
        done(error, user);
      }});

      function addCandidate(){
        let candidate = new Candidate();

        candidate.set('name', profile.name);
        candidate.set('github', profile.login);
        candidate.set('email', profile.email || '');
        candidate.set('provider', 'github');

        candidate.save(null, {
          success(user){
            done(null, user);
          },
          error(user, err){
            done(err, user);
          }
        });}
  }));
}
