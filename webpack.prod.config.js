'use strict';

var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
/**
 * This is a webpack plugin that copies individual files or entire directories to the build directory.
 * https://github.com/kevlened/copy-webpack-plugin
 * @type {CopyWebpackPlugin}
 */
var CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * Extracts stylesheets to a CSS file instead of having webpack inline the stylesheet
 * https://github.com/webpack/extract-text-webpack-plugin
 * @type {ExtractTextPlugin}
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Plugins
 * Define plugins based on the environment.
 * https://webpack.github.io/docs/list-of-plugins.html
 */
var autoPrefixerPlugin = require('autoprefixer');
var appDirectory = path.join(__dirname, 'src');

var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(true),
	// This plugin prevents Webpack from creating chunks
	// that would be too small to be worth loading separately
	new webpack.optimize.MinChunkSizePlugin({	minChunkSize: 51200 /* ~50kb */ }),
	new CopyWebpackPlugin([{ context: 'src', from: { glob: '**/*', dot: true } }], { ignore: ['assets/**/*', '*.js'] }),
	new ExtractTextPlugin('assets/styles/[name].[chunkhash].css'),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'assets/scripts/vendor.bundle.[chunkhash].js',
		minChunks: module => {
			// Separate vendor code by location. Dependencies from `node_modules` are added to vendor file
			return module.resource && module.resource.indexOf(appDirectory) === -1;
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		dropDebugger: true,
		dropConsole: true,
		beautify: false,
		minimize: true,
		screwIe8: true,
		preserveLicenseComments: false,
		useSourceUrl: true,
		generateSourceMaps: true,
		output: { comments: false },
		mangle: {	except: ['exports', 'require', '$q', '$ocLazyLoad'] },
		compress: {
			warnings: false,
			properties: true,
			loops: true,
			global_defs: { debug: true }
		}
	})
];

module.exports = new WebpackConfig().extend({
	'./webpack.common.config.js': config => {
		config.module.loaders.forEach(loader => {
			if (loader.test.test('.html')) {
				// Replace RAW loader with HTML
				loader.loader = 'html';
			} else if (loader.test.test('.png')) {
				// Add image optimizations
				loader.loader = null;
				loader.loaders = [
					'url?limit=20000&hash=sha512&digest=hex&name=assets/images/[name].[hash].[ext]',
					'image-webpack?{progressive: true, optimizationLevel: 7, interlaced: false, pngquant: {quality: "65-90", speed: 4}}'
				];
			} else {
				// Replace name with hashed version
				loader.loader = loader.loader.replace('\[name\]', '[name].[hash]');
			}
		});
		return config;
	}	
}).merge({
	plugins: plugins,
	devtool: 'source-maps',
	output: {
		filename: './app/[name].bundle.[chunkhash].js',
		chunkFilename: './app/[id].chunk.[chunkhash].js'
	},
	module: {	
		loaders: [
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!image!postcss!sass?sourceMap') }
		]
	},
	postcss: [ autoPrefixerPlugin({ browsers: ['last 2 versions', 'not Explorer < 9'] }) ]
});