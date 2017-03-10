### 事件如何传播？
监听深层次事件的思路有两种：
1.将数据看成`tree`，对于监听的属性，递归给其孩子添加同样的事件；
[watchJs](https://github.com/melanke/Watch.JS/)库就是以这种思路实现深绑定，大家有兴趣可以看看。
2.在`setter`函数中，除了触发该`observer`中注册的事件，同时触发`parent observer`中注册的事件。
我的代码主要是以第二种思路实现深绑定。
#### 怎样找到某个`observer`的`parent observer`？
有人提到了，添加一个`$parent`属性指向其`parent observer`，这种方法在这里也是可行的。但我很不喜欢这种循环引用的写法，因为很容易搞挂浏览器。所以我用了一个迂回点的法子，添加一个`supervisor`属性指向其`parent observer`的`watcher`，因为我们只需要触发其`watcher`中注册的事件罢了。想象一个领导，他下面有很多员工，而员工如果有一些常规工作要汇报，只要找他的秘书就可以了。这也是把`watcher`独立出来的好处。
另外一个问题是怎样得到`parent`的属性名，这个就简单了。因为要更改一个属性，首先要访问它的`parent`属性，所以只要在每个属性的`getter`函数里添加一个`$parent`属性，值为其`parent`的属性名即可。
```
// 观察者构造函数
function Observer(data,supervisor = null) {
    this.watcher = new Event();
    this.supervisor = supervisor;//这里添加对supervisor引用
    this.walk(data);
}
//getter
get: function () {
    val.$parent = val.$parent || key;
    return val;
},
//setter
set: function (newVal) {
   if (newVal === val) return;
   if (typeof newVal === 'object') {
        val = new Observer(newVal,this.watcher);
   }
   val = newVal;
   this.watcher.trigger(key,newVal);
   this.supervisor.trigger(this.$parent,newVal);
}
```
#### 怎样实现事件冒泡
但是现在还只是可以触发`parent observer`中注册的事件，但并没有实现事件的冒泡。想要深层事件可以一直冒泡的最外层，必须利用递归的思想一直触发高层` observer`的事件。当一个属性被改变时，除了触发其本身被改变的事件，并且触发一个可以冒泡的`all`事件，在构造函数中给`all`事件增添冒泡到上一层的回调函数。
```
// 观察者构造函数
function Observer(data,supervisor = null) {
    this.watcher = new Event();
    this.supervisor = supervisor;
     this.watcher.listen('all',(val) => {//这里添加冒泡
        if (this.supervisor === null) {return;}
        this.supervisor.trigger(this.$parent,val);
        this.supervisor.trigger('all',val);
    });
    this.walk(data);
}
//setter
set: function (newVal) {
   //do something
   this.watcher.trigger(key,newVal);
   this.supervisor.trigger('all',newVal);
}
```