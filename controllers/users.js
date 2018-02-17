'use strict';

module.exports = function (_, passport, User) {

  return {
    SetRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
      router.get('/home', this.homePage);
      router.get('/auth/google', this.getGoogleLogin);
      router.get('/auth/google/callback', this.googleLogin);
      

      router.post('/', User.LoginValidation, this.postLogin);
      router.post('/signup', User.SignUpValidation, this.postSignup);
    }, 

    indexPage: (req, res) => {
      const errors = req.flash('error');
      return res.render('index', 
      {
        title: 'My App | login',
        messages: errors,
        hasErrors: errors.length > 0
      });
    },

    postLogin: passport.authenticate('local.login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }),

    getSignUp: (req, res) => {
      const errors = req.flash('error');
      return res.render('signup', 
        {
          title: 'My App | SignUp',
          messages: errors,
          hasErrors: errors.length > 0
        });
    },

    postSignup: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    getGoogleLogin: passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }),

    googleLogin: passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    homePage: (req, res) => res.render('home')
  }
}