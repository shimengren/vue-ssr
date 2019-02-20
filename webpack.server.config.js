const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config.js');
const { VueSSRServerPlugin } = require('vue-ssr-webpack-plugin');
module.exports = () =>{
  const serverConfig = merge(baseConfig(),{
    entry:'./entry.server.js',
    target:'node',
    externals:nodeExternals({
      whitelist:/\.css$/
    }),
    output: {
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new VueSSRServerPlugin({
        filename:'vue-ssr-bundle.json',
      })
    ]
  });
  return serverConfig;
};
