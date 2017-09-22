module.exports = {
  entry: './public/src/js/app.js',
  output: {
    filename: './public/dist/js/app.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
