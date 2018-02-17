'use strict';

module.exports = function () {
  return {
    SetRouting: function(router) {
      router.get('/dashboard', this.dashboard)
    },

    dashboard: (req, res) => {
      res.render('admin/dashboard')
    }

  }
}