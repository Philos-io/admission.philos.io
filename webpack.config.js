var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval-source-map',
  entry: './public/scripts/index',
  // entry: ['./public/scripts/index', './server/index']
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: 'admission.philos.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
      { test: /\.html$/, exclude: /node_modules/, loader: 'raw' },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
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
