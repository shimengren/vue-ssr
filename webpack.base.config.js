const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env,arg) => {
  const devMode = true;
  const plugins = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:'style-[contentHash].css',
      filePath:path.resolve(__dirname,'build'),
    }),
  ];
  return {
    mode:'none',
    devtool:devMode ? 'source-map':'',
    output:{
      path:path.resolve(__dirname,'build'),
      filename:'[name]-[hash].js',
      publicPath:'/build/'
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          exclude: /node_modules/,
          use:'babel-loader',
        },
        {
          test:/\.vue$/,
          use:[
            {
              loader:'vue-loader',
            }
          ]
        },
        {
          test:/\.css$/,
          use:[
            devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
             'postcss-loader',
            ],
        },
        {
          test:/\.(png|svg|jpg|jpeg|gif)$/, // 文件体积较小时转成base-64的格式
          use:[
            {
              loader:'url-loader',
              // limit:10000,
            }
          ]
        },
        {
          test:/\.(png|svg|jpg|jpeg|gif)$/,
          use:[
            {
              loader:'file-loader',
            }
          ]
        },
      ],
    },
    resolve:{
      modules:[
       path.resolve(__dirname,'node-modules'),
       'node_modules',
      ],
      alias:{
        '@components':path.resolve(__dirname,'src/components'),
      },
      extensions:['.vue','.js'],
    },
    plugins:plugins,
  };
  }
  