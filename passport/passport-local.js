'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err); };
      if (user) { return done(null, false, req.flash('error', 'That email already exists')); };

      const newUser = new User();
      newUser.username = req.body.username;
      newUser.email = req.body.email;
      newUser.password = newUser.encryptPassword(req.body.password);
      newUser.save((err) => done(null, newUser));
    });
  }
))