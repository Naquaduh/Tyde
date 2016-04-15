'use strict';

// Modules
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Environment
 * Get npm lifecycle event to identify the environment
 */
var environment = process.env.NODE_ENV;
var isTest = environment === 'test';
var isProd = environment === 'production';

// Plugins
var plugins = [
	new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),	
	new webpack.optimize.OccurenceOrderPlugin()
];

if (isProd) {
	var uglifyJs = new webpack.optimize.UglifyJsPlugin({
		dropDebugger: true,
		dropConsole: true,
		beautify: false,
		minimize: true,
		'screw-ie8': false,
		preserveLicenseComments: false,
		compress: {
			warnings: false,
			properties: true,
			loops: true,
			global_defs: { debug: true }
		},
		mangle: {
			except: ['$', 'exports', 'require', '$q', '$ocLazyLoad']
		},
		output: { comments: false },
		useSourceUrl: false,
		generateSourceMaps: false
	});

	var patterns = [
		{	from: __dirname + '/src/assets/images', to: 'assets/images' },
		{ from: __dirname + '/src/assets/fonts', to: 'assets/fonts' },
		{ from: __dirname + '/src/app/components', to: 'app/components' },
		{ from: __dirname + '/src/app/shared', to: 'app/shared' }
	];

	plugins.push(new webpack.NoErrorsPlugin(), new webpack.optimize.DedupePlugin(), new CopyWebpackPlugin(patterns, {ignore: ['*.js']}), uglifyJs);
}

// Skip rendering index.html in test mode
if (!isTest) {
	plugins.push(
		new HtmlWebpackPlugin({template: './src/index.html',	inject: 'body'}),
		new ExtractTextPlugin('assets/styles/[name].css'),
		new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'assets/scripts/vendor.[hash].bundle.js' : 'assets/scripts/vendor.bundle.js')
	);
}

module.exports = {
	context: __dirname,
	cache: isProd,
	debug: !isProd,
	plugins: plugins,
	devtool: isProd ? '#cheap-module-source-map' : 'eval',
	entry: isTest ? {} : { tyde: './src/app/tyde', vendor: ['angular', 'jquery', 'bootstrap'] },
	output: {
		path: __dirname + '/dist',
		publicPath: isProd ? '/' : 'http://localhost:8080/',
		filename: isProd ? 'app/[name].[hash].js' : 'app/[name].bundle.js',
		chunkFilename: isProd ? 'app/[id].chunk.[hash].js' : 'app/[id].chunk.js'
	},
	resolve: {
		extensions: ['', '.js', '.scss', '.css'],
		modulesDirectories: ['.', 'node_modules']
	},
	module: {
		loaders: [
			{test: /\.html$/,	loader: 'raw'},
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/fonts/[name].[ext]'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]'},
			{test: /\.(png|jpg|jpeg|gif|ico)$/, loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]'},
			{test: /\.scss$/,	loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass!postcss')},
			{test: /\.js$/, loader: 'ng-annotate'},
			{test: /\.js$/,	loader: 'babel', exclude: /node_modules/, query: {cacheDirectory: isProd, presets: ['es2015'], plugins: ['transform-runtime', 'transform-object-assign'] }	}
		]
	},
	sassLoader: {	precision: 8 },
	postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ],
	devServer: { contentBase: './src', stats: 'minimal' },
	stats: { colors: true,	reasons: true }
};

// module.exports = function makeWebpackConfig() {
//   /**
//    * Config
//    * Reference: http://webpack.github.io/docs/configuration.html
//    * This is the object where all configuration gets set
//    */
//   var config = {};
//
//   /**
//    * Entry
//    * Reference: http://webpack.github.io/docs/configuration.html#entry
//    * Should be an empty object if it's generating a test build
//    * Karma will set this when it's a test build
//    */
//   config.entry = isTest ? {} : {
//     app: './src/app/tyde.js'
//   };
//
//   /**
//    * Output
//    * Reference: http://webpack.github.io/docs/configuration.html#output
//    * Should be an empty object if it's generating a test build
//    * Karma will handle setting it up for you when it's a test build
//    */
//   config.output = isTest ? {} : {
//     // Absolute output directory
//     path: __dirname + '/dist',
//
//     // Output path from the view of the page
//     // Uses webpack-dev-server in development
//     publicPath: isProd ? '/' : 'http://localhost:8080/',
//
//     // Filename for entry points
//     // Only adds hash in build mode
//     filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
//
//     // Filename for non-entry points
//     // Only adds hash in build mode
//     chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
//   };
//
//   /**
//    * Devtool
//    * Reference: http://webpack.github.io/docs/configuration.html#devtool
//    * Type of sourcemap to use per build type
//    */
//   if (isTest) {
//     config.devtool = 'inline-source-map';
//   } else if (isProd) {
//     config.devtool = 'source-map';
//   } else {
//     config.devtool = 'eval-source-map';
//   }
//
//   /**
//    * Loaders
//    * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
//    * List: http://webpack.github.io/docs/list-of-loaders.html
//    * This handles most of the magic responsible for converting modules
//    */
//
//   // Initialize module
//   config.module = {
//     preLoaders: [],
//     loaders: [{
//       // JS LOADER
//       // Reference: https://github.com/babel/babel-loader
//       // Transpile .js files using babel-loader
//       // Compiles ES6 and ES7 into ES5 code
//       test: /\.js$/,
//       loader: 'babel',
//       exclude: /node_modules/
//     }, {
//       // CSS LOADER
//       // Reference: https://github.com/webpack/css-loader
//       // Allow loading css through js
//       //
//       // Reference: https://github.com/postcss/postcss-loader
//       // Postprocess your css with PostCSS plugins
//       test: /\.css$/,
//       // Reference: https://github.com/webpack/extract-text-webpack-plugin
//       // Extract css files in production builds
//       //
//       // Reference: https://github.com/webpack/style-loader
//       // Use style-loader in development.
//       loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
//     }, {
//       // ASSET LOADER
//       // Reference: https://github.com/webpack/file-loader
//       // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
//       // Rename the file using the asset hash
//       // Pass along the updated reference to your code
//       // You can add here any file extension you want to get copied to your output
//       test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
//       loader: 'file'
//     }, {
//       // HTML LOADER
//       // Reference: https://github.com/webpack/raw-loader
//       // Allow loading html through js
//       test: /\.html$/,
//       loader: 'raw'
//     }]
//   };
//
//   // ISPARTA LOADER
//   // Reference: https://github.com/ColCh/isparta-instrumenter-loader
//   // Instrument JS files with Isparta for subsequent code coverage reporting
//   // Skips node_modules and files that end with .test.js
//   if (isTest) {
//     config.module.preLoaders.push({
//       test: /\.js$/,
//       exclude: [
//         /node_modules/,
//         /\.spec\.js$/
//       ],
//       loader: 'isparta-instrumenter'
//     })
//   }
//
//   /**
//    * PostCSS
//    * Reference: https://github.com/postcss/autoprefixer-core
//    * Add vendor prefixes to your css
//    */
//   config.postcss = [
//     autoprefixer({
//       browsers: ['last 2 version']
//     })
//   ];
//
//   /**
//    * Plugins
//    * Reference: http://webpack.github.io/docs/configuration.html#plugins
//    * List: http://webpack.github.io/docs/list-of-plugins.html
//    */
//   config.plugins = [];
//
//   // Skip rendering index.html in test mode
//   if (!isTest) {
//     // Reference: https://github.com/ampedandwired/html-webpack-plugin
//     // Render index.html
//     config.plugins.push(
//       new HtmlWebpackPlugin({
//         template: './src/index.html',
//         inject: 'body'
//       }),
//
//       // Reference: https://github.com/webpack/extract-text-webpack-plugin
//       // Extract css files
//       // Disabled when in test mode or not in build mode
//       new ExtractTextPlugin('assets/styles/[name].[hash].css', {disable: !isProd}),
// 		  new webpack.optimize.CommonsChunkPlugin('vendor', 'assets/scripts/vendor.bundle.js')
//     )
//   }
//
//   // Add build specific plugins
//   if (isProd) {
//     config.plugins.push(
//       // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
//       // Only emit files when there are no errors
//       new webpack.NoErrorsPlugin(),
//
//       // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
//       // Dedupe modules in the output
//       new webpack.optimize.DedupePlugin(),
//
//       // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//       // Minify all javascript, switch loaders to minimizing mode
//       new webpack.optimize.UglifyJsPlugin(),
//
//       // Copy assets from the public folder
//       // Reference: https://github.com/kevlened/copy-webpack-plugin
//       new CopyWebpackPlugin([{
//         from: __dirname + '/src/assets'
//       }])
//     )
//   }
//
//   /**
//    * Dev server configuration
//    * Reference: http://webpack.github.io/docs/configuration.html#devserver
//    * Reference: http://webpack.github.io/docs/webpack-dev-server.html
//    */
//   config.devServer = {
//     contentBase: './src',
//     stats: 'minimal'
//   };
//
//   return config;
// }();
