'use strict'

/* eslint no-console: 0 */

const config = require('getconfig')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')

const isDeveloping = process.env.NODE_ENV !== 'production'
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))

const cookieParser = require('cookie-parser')
app.use('*', cookieParser(config.cookie.secret))
app.use('*', function (req, res, next) {
  res.cookie('config', JSON.stringify(config.client))
  next()
})

app.use('/config', (req, res) => {
  res.json(config.client)
})

if (isDeveloping) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    // publicPath: webpackConfig.output.publicPath,
    publicPath: webpackConfig.output.publicPath,
    // contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', function response (req, res) {
    res.redirect('/index.html')
  })
} else {
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })
}

app.listen(config.http.port, config.http.listen, function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://%s:%s/ in your browser.',
    config.http.port,
    config.http.listen,
    config.http.port
  )
})
