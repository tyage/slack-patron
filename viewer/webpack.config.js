const path = require('path');

module.exports = (env, argv) => ({
  entry: './front/app.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'app.js'
  },
  devtool: argv.mode === 'production' ? 'source-map' : 'eval',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    }]
  }
});
