这个任务主要用到了`page.settings['userAgent']`和`page.viewportSize`两个属性。用法如下：
```
page.settings.userAgent = 想要模拟的设备的userAgent;
page.viewportSize = {
  width: 期望的屏幕宽,
  height:期望的屏幕高
};
```
读取配置文件我是用到了一个读文件的模块fs：
```
var fs = require("fs");
//读取配置文件
/*fs.encoding="GB2312";
//调用读的方法
file=fs.open("option.json",'r');
option=JSON.parse(file.read());
//读取完毕后关闭
file.close();
```
后来看了其他人的代码发现用`require`就行。。。
```
var option = require('./option.json');
```
还有就是将中文作为`url`后面的参数时，必须对参数进行`编码`，否则服务器接收到的可能是乱码。