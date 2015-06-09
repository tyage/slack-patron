module.exports = {
  entry: './app/public/src/js/app.js',
  output: {
    filename: './app/public/dist/js/app.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
