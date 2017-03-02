var app = require('ampersand-app')
var setFavicon = require('favicon-setter')
var View = require('ampersand-view')
var dom = require('ampersand-dom')
var ViewSwitcher = require('ampersand-view-switcher')
var _ = require('lodash')
var domify = require('domify')
var localLinks = require('local-links')

var bodyHbs = require('./body.hbs')
var headHbs = require('./head.hbs')
var NavbarView = require('views/navbar')
var footerHbs = require('./footer.hbs')

module.exports = View.extend({
  template: bodyHbs,
  autoRender: true,
  initialize: function () {
    this.title = 'Hacienda'

    // this marks the correct nav item selected
    this.listenTo(app, 'page.switch', this.onSwitchPage)
  },
  events:{
    'click a[href]': function (e) {
      e.preventDefault()
      var localPath = localLinks.pathname(e)
      if (localPath) {
        app.navigate(localPath)
      }
    }
  },
  subviews: {
    navbar: {
      selector: '[data-hook=navbar-container]',
      constructor: NavbarView
    }
  },
  render: function () {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(headHbs(this)))
    document.body.className = 'big-menu';
    document.body.appendChild(domify(footerHbs(this)))

    // main renderer
    this.renderWithTemplate(this)

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(
      this.queryByHook('page-container'), {
        show: function (newView, oldView) {
          document.title = _.result(newView, 'pageTitle') || 'Interactar'
          document.scrollTop = 0
          dom.addClass(newView.el, 'active')
          app.currentPage = newView
        }
      }
    )

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/favicon.ico')

    return this
  },
  onSwitchPage: function (view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view)
  }
})
