'use strict';

var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var appDirectory = path.join(__dirname, 'src');

module.exports = new WebpackConfig().extend('./webpack.common.config.js').merge({
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'assets/scripts/vendor.bundle.js',
			minChunks: module => {
				// Separate vendor code by location. Dependencies from `node_modules` are added to vendor file
				return module.resource && module.resource.indexOf(appDirectory) === -1;
			}
		})
	],
	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	devtool: 'eval-source-map',
	cache: true,
	debug: true,
	output: {	pathinfo: false, publicPath: 'http://localhost:8080/' },
	devServer: { contentBase: './src', stats: 'minimal', compress: true },
	module: {	loaders: [ { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap' } ] }
});