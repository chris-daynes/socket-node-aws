'use strict';

module.exports = function () {
  return {
    SetRouting: function(router) {
      router.get('/dashboard', this.adminPage);

      // router.post('/dashboard')
    },

    adminPage: (req, res) => {
      res.render('admin/dashboard')
    }

  }
}