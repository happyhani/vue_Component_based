###Welcome to use MarkDown

### 用webpack将viewport.js打包到js中去
* 修改webpack配置文件 将  entry: {app:'./app/js/main.js'}  ->  entry: ['./app/js/viewport.js','./app/js/main.js'],

此时页面中可以看到如下代码：
`<html data-dpr="2" max-width="540" style="font-size: 40px;">

</html>`











