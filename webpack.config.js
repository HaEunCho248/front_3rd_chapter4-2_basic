const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './js/main.js',
    products: './js/products.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  performance: {
    hints: false,
  }
};