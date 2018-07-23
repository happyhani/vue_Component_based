/*jslint es6 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = env => {
  if(!env){ // 没有参数的时候要给env赋值，防止没有传参数的时候变量名取到的是undefined，不能是undefind.production
    env = {}
  }
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'app/views/index.html'
    }),
    new VueLoaderPlugin()
  ]
  if(env.production){
    plugins.push(
      new webpack.DefinePlugin({ // 修改node环境变量
        process: {
          env: {
            NODE_ENV: JSON.stringify('production')
          }
        }
      }),
      new ExtractTextPlugin("style.css") // 将多个css打包成一个css文件引入
    )
  }
  return {
    entry: {
      app: './app/js/main.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"), // 静态文件在哪输出
      compress: true, // 开启gzip压缩
      port: 9000
    },
    module: {
      rules: [{
        test:/\.html$/,
        loader: 'html-loader'
      },{
        test:/\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            localIdentName: '[path][name]---[local]---[hash:base64:5]',
            camelCase: true
          },
          loaders: env.production?{
            css: ExtractTextPlugin.extract({
              use: 'css-loader!px2rem-loader?remUni=75&remPrecision=8',
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            }),
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!px2rem-loader?remUni=75&remPrecision=8!sass-loader',
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
          }:{
            css:'vue-style-loader!css-loader!px2rem-loader?remUni=75&remPrecision=8',
            scss:'vue-style-loader!css-loader!px2rem-loader?remUni=75&remPrecision=8!sass-loader'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.scss$/,
        loader: 'style-loader!css-loader!sass-loader' // 串行解析从右向左解析
      }]
    },
    plugins: plugins,  // es6中直接plugins 即可
    output: {
      filename: '[name].min.js', // name的值就是entry的app
      path: path.resolve(__dirname,'dist') // resolve相对路径  __dirname当前路径
    },
    resolve: {
      extensions: [".js", ".json", ".css", ".vue"], // 使用的扩展名
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    }
  }
};