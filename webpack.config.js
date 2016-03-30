var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './public/scripts/index',
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: 'admission.philos.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw',
      },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devServer:{
    contentBase: path.join(__dirname, 'public/scripts')
  }
};
