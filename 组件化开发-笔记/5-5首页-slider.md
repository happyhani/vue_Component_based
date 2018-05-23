###Welcome to use MarkDown
![slider](5-5-slider.png)
上图显示，图片只有750，不够充满设备宽时，如何处理？
解决这个问题，不能在抽象组件中修改，因为下方的slider是不能充满100%的，所以要在业务组件中修改。
在home/hslider.vue中局部样式里修改`$style.slider`对应的img样式