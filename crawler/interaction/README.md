### IFE2017
网页抓取分析服务系列之四（数据交互）
这一次服务器框架采用的是推荐的`koa2`，第一次接触后台程序的编写，做了很多尝试。。
首先`Koa2`是一个轻型的框架，除了提供一些基本的函数，它不绑定任何中间件。`Koa2`把`http`请求和响应包装成一个对象`ctx`，并且支持`async`函数，使开发者可以愉快地按照自己喜好编写中间件。不过我由于是初学，所以大部分采用了别人写好的中间件。
`Koa2`将客户端的请求包装后赋值给`ctx.request`，而`ctx.query`是`ctx.request.query`的别名，可以通过`ctx.query`得到`get`请求的参数。而  返回`html`时可以利用下面的代码：
```
ctx.status = 200;
ctx.set('Content-Type', 'text/html');
ctx.body = ...
```
由于这一部分涉及到一些需要同步的操作，所以我采用了`async`函数编写中间件，并将执行爬虫、对爬虫数据进行二次操作和存储数据的操作都包装成了`promise`对象。`Promise` 是异步编程的一种解决方案，它像是回调函数的语法糖，使开发者可以用链式调用的方法将异步操作表达出来，从而避免回调地狱。创建一个`promise`实例非常简单：
```
var promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
//回调函数
promise.then(function(value) {
  // resolved函数
}, function(error) {
  // rejected函数
});
```
其中`resolve`和`reject`由javascript引擎提供，当执行到`resolve(value);`语句时该`promise`对象的状态会变成`resolved`，并将`value`作为参数传递给`then`函数的第一个参数（`resolved`函数）；当执行到`reject(error);`语句时该`promise`对象的状态会变成`rejected`，并将`error`作为参数传递给`then`函数的第二个参数（`rejected`函数）。
而`async`函数是更高级更方便的异步解决方案，`async`函数需要在函数声明前加上`async`关键字。当`async`函数执行过程中遇到`await`操作符时，函数会停下来等`await`后面的语句执行完毕时再继续。`await`后面的语句必须返回一个`promise`对象，如果不是会被转化成一个状态为`resolve`的`promise`对象。当该`promise`对象的状态变成`resolve`时，异步操作的结果会被返回，函数才会继续执行。
向百度请求图片采用了`request`模块，而读写文件采用了`fs`模块。结果显示用了`swig`模板引擎和`co-views`模块渲染。
图片的id通过一个函数生成：
```
function uid() {
  return Math.random().toString(36).slice(2);
}
```