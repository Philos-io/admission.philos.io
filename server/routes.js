'use strict';

let Parse = require('parse/node').Parse;
let emailConfig = require('./email-configuration');

module.exports = function(app, passport){

  app.get('/auth/github', passport.authenticate('github'), ()=>{});

  function callback(req, res) {
    req.session.user = req.user;
    res.redirect('/#/register');
  }

  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/error' }), callback);

  app.get('/api/users/me', (req, res) => {
    res.send(req.session.user).status(200);
  });

  app.post('/api/users/register', function(req, res){

    let newCandidate = req.body.user;
    let Candidate = Parse.Object.extend("Candidate");
    let query = new Parse.Query(Candidate);

    query.equalTo("github", newCandidate.github);

    query.first({
      success: (user) => {
        user.save(null, {
          success: (updateUser) =>{
            updateUser.set('passInterview', false);
            updateUser.set('interviewed', false);

            updateUser.set('job', newCandidate.job);
            updateUser.set('email', newCandidate.email);
            updateUser.set('company', newCandidate.company);
            updateUser.set('session', newCandidate.session);
            updateUser.set('isFreelance', newCandidate.isFreelance);
            updateUser.set('programmingLanguage', newCandidate.programmingLanguage);

            updateUser.save();

            emailConfig.processEmail(req, res, req.session.user);

            // remove the current user from the session
            req.session.user = null;
            res.send({message: 'saved', user: user}).status(200);
          },
          error: (user, err) =>{
            res.send({message: 'user not saved'}).status(500);
          }
        });
      },
      error: (user, error) =>{
        res.send({message: 'user not saved'}).status(500);
      }
    });
  });
}
