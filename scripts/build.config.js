var path = require('path');
var webpack = require('webpack')

module.exports = {
	entry: path.resolve(__dirname, '../docs/index.js'),
	output: {
		path: path.resolve(__dirname, '../docs/build'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, '../src/components'),
			pickers: path.resolve(__dirname, '../src/pickers'),
			'react-colors': path.resolve(__dirname, '../lib')
		},
    extensions: ['.js', '.jsx']
  },
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react', 'stage-2'],
				plugins: ['transform-decorators-legacy'],
			}
		},{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},{
			test: /\.json$/,
			loader: 'json-loader'
		},{
			test: /\.md$/,
			loader: 'raw-loader'
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })	
	]
}	

			