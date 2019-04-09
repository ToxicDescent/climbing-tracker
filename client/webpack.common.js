const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: {
              publicPath: '/',
              hot: true
            }
          },
          'css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Climbing Tracker',
      template: './src/public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractCssChunksPlugin({ filename: 'style.css' })
  ]
};
