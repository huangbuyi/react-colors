var path = require('path');
var webpack = require('webpack')

module.exports = {
	entry: path.resolve(__dirname, '../docs/index.js'),
	output: {
		path: path.resolve(__dirname, '../docs/build'),
		publicPath: 'http://127.0.0.1:8080/docs/build/',
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
			loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
		},{
			test: /\.json$/,
			loader: 'json-loader'
		},{
			test: /\.md$/,
			loader: 'raw-loader'
		}]
	},
	devtool: "cheap-eval-source-map",
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		//progress: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE.ENV':"development"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}	

			