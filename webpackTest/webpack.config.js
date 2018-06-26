/*jslint es6 */
const path = require('path');
module.exports = {
    entry: {
      app: './app/js/main.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"), // 静态文件在哪输出
      compress: true, // 开启gzip压缩
      port: 9000
    },
    module: {
      loader:[{
        test:/\.html$/,
        loader: 'html-loader'
      },{
        test:/\.vue$/,
        loader: 'vue-loader'
      },{
        test:/\.scss$/,
        loader: 'style-loader!css-loader!sass-loader' // 串行解析从右向左解析
      }]
    },
    plugins: [],
    output:{
      filename: '[name].min.js', // name的值就是entry的app
      path: path.resolve(__dirname,'dist') // resolve相对路径  __dirname当前路径
    }
};