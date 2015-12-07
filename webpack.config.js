var path = require('path');

module.exports = {
	entry: './index.js',
	output:{
		filename: 'build.js',
    path: 'dist'
	},

 	module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.html$/,
        loader: "raw"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: "\.jpg$",
        loader: "file"
      },
      {
        test: "\.png$",
        loader: "url"
      }]
  },

  devServer: {
    contentBase: "./",
  }
};
