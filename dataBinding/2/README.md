看了其他人的笔记，发现我似乎走了一条不同寻常的路线（捂脸）。。
### 设置新的值是一个对象的情况
这个时候，新的对象里的所有属性必须被递归地定义`setter`和`getter`，所以在`setter`函数里加上一句代码：
```
        set: function (newVal) {
            //do something
            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
        }
```
这样就可以对新设置的对象进行监听其值的变化。
### 给某个特定属性的改变添加回调函数
第一反应是修改`Observer`构造函数：
```
function Observer(data) {
	this.data = data;
    this.watcher = new Event();//给Observer实例添加watcher
    this.walk(data);
}
```
`$watcher`函数很简单：
```
p.$watch = function (key,callback) {
    this.watcher.listen(key,callback);//利用watcher监听key属性的变化
}
```
`setter`中添加：
```
        set: function (newVal) {
            //do something
            this.watcher.trigger(key,newVal);//触发属性改变事件
        }
```
可是这样有一个问题，当`data`是一个“比较深”的对象，对于其为对象的属性值我们`new`了一个新的`Observer`，但是却没有保持它的引用，所以得不到它的`watcher`。所以我修改了一下代码：
```
        set: function (newVal) {
            //do something
            if (typeof newVal === 'object') {
                val = new Observer(newVal);
            }
        }
```
`walk`中的代码也同样地修改了下。
而为了不出现读“深”对象时出现类似于`app.data.name.data.lastName`这种情况，我去掉了`Observer`构造函数里的`data`属性：
```
function Observer(data) {
//	this.data = data;
    this.watcher = new Event();//给Observer实例添加watcher
    this.walk(data);
}
```
而是将最外层的`Observer`包装了一下：
```
function observerFactory(data) {
    return {
        data: new Observer(data),
        $watch: function (key,callback) {
            this.data.$watch(key,callback);
        }
    }
}
```
 `$watch`函数则利用递归找到给定的属性：
 ```
 p.$watch = function (key,callback) {
    if(key in this){
        this.watcher.listen(key,callback);
    }
    else {
        for (let [prop, val] of Object.entries(this)) {
            if (val instanceof Object && !!val.$watch) {
                val.$watch(key,callback);
            }
        }
    }
}
```
这个解决方案显然不全面，只能保证在给定的对象中没有重名属性的情况下才能得到正常结果。如果出现有重名属性的情况则会出现问题，`$watch`没有办法判断需要监听的到底是哪些属性。
```
var data1 = {
	name: 'XIAO MING',
	teacher: {
		name: XXX,
		address: XX
	}
}
```
### 思考：`$watch`应该怎么设计
所以问题出在`$watch`函数的key参数上。虽然也可以不用条件判断，一直递归下去遍历对象的每一个属性，但是这显然太过暴力。参考了下别人的代码，发现key这个参数应该支持命名空间，即以`teacher.name`的形式出现，这样即可和重名属性区分开了。至于实现，已经有人在笔记里贴了代码，我就不贴了。