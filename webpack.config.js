var webpack = require('webpack');

var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }));
}

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/assets/',
    filename: 'app.js',
    library: 'App',
    libraryTarget: 'umd'
  },
  entry: {
    'app': ['./src/main.js']
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'es6']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx|\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0&optional=runtime'
      }
    ]
  },
  plugins: plugins
};
