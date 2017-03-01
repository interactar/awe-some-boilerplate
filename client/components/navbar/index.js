const View = require('ampersand-view')

var AuthComponent = require('components/auth')

module.exports = View.extend({
  template: require('./navbar.hbs'),
  subviews: {
    user: {
      selector: '[data-hook=items-container]',
      constructor: AuthComponent
    }
  }
})
