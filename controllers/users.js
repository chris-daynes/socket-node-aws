'use strict';

module.exports = function (_, passport) {

  return {
    SetRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
      router.get('/home', this.homePage);


      router.post('/signup', this.postSignup)
    }, 

    indexPage: (req, res) => res.render('index', {test: 'This is a testttttt'}),

    getSignUp: (req, res) => res.render('signup'),

    postSignup: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    homePage: (req, res) => res.render('home')
  }
}