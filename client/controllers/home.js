var HomePage = require('views/pages/home')

module.exports = function () {
  var action = arguments[0]

  app.trigger('page.switch', new HomePage())
  document.body.scrollTop = document.documentElement.scrollTop = 0
}
