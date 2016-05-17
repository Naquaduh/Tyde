'use strict';

var WebpackConfig = require('webpack-config');

WebpackConfig.environment.setAll({ env: process.env.NODE_ENV });

module.exports = new WebpackConfig().extend('./webpack.[env].config.js');