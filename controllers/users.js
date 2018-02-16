'use strict';

module.exports = function (_, passport, User) {

  return {
    SetRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
      router.get('/home', this.homePage);


      router.post('/signup', User.SignUpValidation, this.postSignup)
    }, 

    indexPage: (req, res) => res.render('index', {test: 'This is a testttttt'}),

    getSignUp: (req, res) => {
      const errors = req.flash('error');
      return res.render('signup', 
        {
          title: 'My App | login',
          messages: errors,
          hasErrors: errors.length > 0
        });
    },

    postSignup: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    homePage: (req, res) => res.render('home')
  }
}