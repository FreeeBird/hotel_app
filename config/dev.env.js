'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8080/ho-api"',
  // BASE_API: '"http://123.206.206.93:8080/hotel"',
  //BASE_API: '"http://192.168.31.163:8080/hotel"',
})
