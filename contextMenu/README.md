### IFE2017
实现效果是右键点击自定义区域后出现自定义菜单，而点击非自定义区域菜单消失；右键点击非自定义区域时，由于会出现浏览器默认菜单，所以自定义菜单消失。点击自定义区域自定义菜单不会消失。菜单始终在浏览器视口范围。
### 1.oncontextmenu和onclick
元素的oncontextmenu事件为右键点击事件，而onclick事件为点击事件。利用DOM的这两个属性为自定义区域和全局区域以及自定义菜单加上点击和右键点击的回调函数：
```
var clickArea = document.querySelector('#clickArea');
var menu = document.querySelector('#menu');
//监听自定义菜单区域右键点击事件
clickArea.oncontextmenu = showMenu;
//监听全局点击事件
window.oncontextmenu = hideMenu;
window.onclick = hideMenu;
//监听自定义菜单点击事件
menu.onclick = showName;
```
### 2.在全局点击事件里，需要判断点击事件是发生在自定义菜单区域还是非自定义菜单区域的。可以通过判断点击事件是否发生在自定义菜单区域上或者其子元素上来进行相应处理：
```
var src = e.srcElement;
var children = clickArea.getElementsByTagName('*');
//判断点击区域是否为自定义菜单区域，是则返回
if(src === clickArea || [].indexOf.call(children,src) !== -1){
	return;
}
```
### 3.自定义菜单显示位置
得到菜单显示位置需要知道鼠标点击的位置、菜单的宽高和浏览器视口的尺寸，鼠标点击的位置可以通过点击事件对象的clientX和clientY属性得到，浏览器视口宽高可以通过window.innerWidth和window.innerHeight两个属性获得，元素的宽高可以通过offsetWidth和offsetHeight获得。首先，将菜单的visibility属性赋值为hidden，这样才能通过offsetWidth和offsetHeight拿到元素宽高；设置display:none时其offsetWidth和offsetHeight均为0。visibility:hidden和display:none的区别是前者只是使元素看不见，但元素还在页面上；而后者将不会被浏览器渲染，元素尺寸也不会参与到页面上其它元素位置计算中。

为了当存在滚动条时菜单位置正常，样式采用了position:fixed，通过改变top和left从而改变位置。

通过函数 getMenuPosition计算菜单显示位置
```
function getMenuPosition(x,y) {
	var width = menu.offsetWidth;
	var height = menu.offsetHeight;
	var left = (x + width) < window.innerWidth ? x : x - width;
	var top = (y + height) < window.innerHeight ? y : y - height;
	return {
		left: left,
		top: top
	}
}
```
### 4.自定义菜单的点击事件
这里采用事件代理，监听菜单的点击事件。通过event.srcElement属性得到点击的目标，通过textContent得到该子菜单的名字。