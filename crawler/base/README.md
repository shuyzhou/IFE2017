第一次接触phantomjs，不是很熟练。。
主要用到了两个模块`webpage`和`system`，`webpage`用来爬取页面，通过`system`获得命令行参数。当在命令行试用phantomjs命令时，执行的脚本名和参数被保存在`system.args`中。
```
var page = require('webpage').create()；
```
可以得到一个`webpage`实例对象，有一些常用的实例方法：
`open`方法默认使用get方法访问某个网页，其回调函数会被传入一个`status`参数，如果服务器有任何响应则`status`为`"success"`；否则为`"fail"`
`includeJs`方法可以引入外部脚本；
`evaluate`方法将回调函数的上下文绑定在获取到的页面上，它会产生一个沙箱，外部和其内部的通信只能通过`evaluate`函数的参数和回调函数的`return`语句。
`loadingProgress`属性表示当前页面加载的进度，其值为`100`时表示页面加载完毕。可以通过这个属性判断页面是否加载完毕，等加载完后再对页面内容进行爬取。
`loading`属性表示当前页面是否在加载，当其值为`true`时表示正在加载，为`false`时表示加载完成。
函数末尾必须加上`phantom.exit();`退出phantomjs执行环境。