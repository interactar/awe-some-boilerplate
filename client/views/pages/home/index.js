var PageView = require('components/base-page')

module.exports = PageView.extend({
  template: require('./template.hbs'),
  pageTitle: 'Home',
  autoRender: true,
  initialize: function () {},
  subviews: {}
})
