var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './assets/index.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'application.js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
      { test: /\.jsx\.js$/, loader: 'jsx-loader!babel-loader', exclude: /(node_modules|bower_components)/ },
      // { test: /\.scss$/, loader: "style!css!sass?outputStyle=expand" },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=compressed")}
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    new ExtractTextPlugin('../css/application.css')
  ]
}
