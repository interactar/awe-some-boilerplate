var app = require('ampersand-app')

var NavbarActions = {
  startLogin: function () {
    app.state.navbar.set('signingIn', 'signIn')
  },
  requestPasswordReset: function () {
    app.state.navbar.set('signingIn', 'requestPasswordReset')
  },
  resetPassword: function () {
    app.state.navbar.set('signingIn', 'resetPassword')
  },
  finishLogin: function () {
    app.state.navbar.set('signingIn', null)
  },
  startRegistration: function () {
    app.state.navbar.set('signingUp', true)
  },
  finishRegistration: function () {
    app.state.navbar.set('signingUp', false)
  }
}

module.exports = NavbarActions
