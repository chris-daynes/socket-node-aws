'use strict';

module.exports = function() {
  return {
    SignUpValidation: (req, res, next) => {
      req.checkBody('username', 'Username is Required').notEmpty();
      req.checkBody('username', 'Username must be more than 5 characters').isLength({min: 5});
      req.checkBody('email', 'Email is required').notEmpty()
      req.checkBody('email', 'Email is invalid').isEmail({})
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password', 'Must be greater than 5 characters').isLength({min: 5});

      req.getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          req.redirect('/signup');
        })
        .catch(err => next());
    },

    LoginValidation: (req, res, next) => {
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is invalid').isEmail({});
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password', 'Must be greater than 5 characters').isLength({min: 5});

      req.getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          req.redirect('/');
        })
        .catch(err => next());
    }
  }
}