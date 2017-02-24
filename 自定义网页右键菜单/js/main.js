var clickArea = document.querySelector('#clickArea');
var menu = document.querySelector('#menu');
//监听自定义菜单区域右键点击事件
clickArea.oncontextmenu = showMenu;
//监听非自定义菜单区域点击事件
window.oncontextmenu = hideMenu;
window.onclick = hideMenu;
function showMenu(e) {
	var position = getMenuPosition(e.clientX,e.clientY);
	menu.style.top = position.top + "px";
	menu.style.left = position.left + "px";
	menu.style.visibility = "visible";
	e.preventDefault();
}
function hideMenu(e) {
	var src = e.srcElement;
	var children = clickArea.getElementsByTagName('*');
	//判断点击区域是否为自定义菜单区域，是则返回
	if(src === clickArea || [].indexOf.call(children,src) !== -1){
		return;
	}
	menu.style.visibility = "hidden";
}
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