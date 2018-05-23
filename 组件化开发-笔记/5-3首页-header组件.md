### 分析header如何实现

* 应该用4个DOM节点就可以实现，
* 中间的logo是用img图片还是背景图，有什么区别？
*  1、 img-占用一个http链接  
*  2、背景图-大小好控制（background-size）、位置好控制（background-position）、可以使用构建工具打包成base64编码到css里去

### 书写css的技巧：
position: fixed;
top: 0;
left: 0;
right: 0; /* 这里的目的是 width是100%  */ 
等同于：
position: fixed;
top: 0;
left: 0;
width: 100%;

图片将前面的协议拿掉，这样他是什么协议就是什么协议
https://m.jr.jd.com/spe/qyy/main/images/jr-logo.png -> //m.jr.jd.com/spe/qyy/main/images/jr-logo.png

写好代码后查看页面 按钮样式不正确。经检查没有viewport，html的font-size就没有，这里在js中新建viewport.js，将hotcss.js代码考进来即可

import "../../css/reset.scss" 从home的index.vue移动到router的index.js中