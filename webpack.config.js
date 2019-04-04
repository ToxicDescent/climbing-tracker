const webpack = require('webpack');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: './src/client/index.jsx',
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
              // reloadAll: true
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
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractCssChunksPlugin({ filename: 'style.css' })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
