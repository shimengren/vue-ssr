const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const { VueSSRClientPlugin } = require('vue-ssr-webpack-plugin');

module.exports = () =>{
  const clientConfig = merge(baseConfig(),{
    entry: './entry.client.js',
    plugins:[
      new webpack.optimize.SplitChunksPlugin({
        chunks: "all",
        minSize: 20000,
        minChunks: 1,
      }),
      new VueSSRClientPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
  return clientConfig;
}