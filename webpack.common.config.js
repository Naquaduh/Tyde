'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackConfig = require('webpack-config');
/**
 * This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename which changes
 * every compilation. You can either let the plugin generate an HTML file for you, supply your own template
 * using lodash templates or use your own loader.
 *
 * https://github.com/ampedandwired/html-webpack-plugin
 * @type {HtmlWebpackPlugin}
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appDirectory = path.join(__dirname, 'src');

/**
 * Plugins
 * Define plugins based on the environment.
 * https://webpack.github.io/docs/list-of-plugins.html
 */
var plugins = [
	// Prefetch long module build chains
	new webpack.PrefetchPlugin('./src/app/shared/services/state.service.js'),
	new webpack.PrefetchPlugin('./node_modules/core-js/library/fn/object/define-property.js'),
	new webpack.PrefetchPlugin('./node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff'),
	new webpack.PrefetchPlugin('./node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2'),
	new webpack.PrefetchPlugin('./node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot'),
	new webpack.PrefetchPlugin('./node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg'),
	new webpack.PrefetchPlugin('./node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf'),
	new webpack.PrefetchPlugin('./src/assets/styles/tyde.scss'),
	new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
	new HtmlWebpackPlugin({ template: './src/index.html', inject: true })
];

module.exports = new WebpackConfig().merge({
	context: __dirname,
	plugins: plugins,
	resolve: { root: path.resolve('./app') },
	entry: { tyde: './src/app/tyde' },
	output: {
		path: __dirname + '/dist',
		pathinfo: false,
		publicPath: '/',
		filename: './app/[name].bundle.js',
		chunkFilename: './app/[id].chunk.js'
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, loader: 'source-map', exclude: [appDirectory] }
		],
		loaders: [
			{ test: /\.html$/, loader: 'raw' },
			{ test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/fonts/[name].[ext]' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?mimetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
			{ test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
			{ test: /\.(png|jpe?g|gif)$/i, loader: 'file?name=assets/images/[name].[ext]' }
		]
	},
	sassLoader: {	precision: 8 },
	stats: { colors: true,	reasons: true }
});