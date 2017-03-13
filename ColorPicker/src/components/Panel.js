import util from '../lib/util.js';
import watcher from './watcher.js';
export default class Panel {
	constructor(el,color) {
		this.el = document.querySelector(el);
		this.ctx = this.el.getContext('2d');
		this.color = color;
		this.init();
	}
	init() {
		this.el.height = 500;
		this.el.width = 500;
		this.render(this.color,394,103);
		//监听点击事件
		this.el.addEventListener('click',function (e) {
			var x = e.offsetX,
				y = e.offsetY;
			this.render(this.color,x,y);
			//触发颜色改变事件
			var color = util.getColor(this.ctx,x,y);
			watcher.trigger('colorChange',color);
		}.bind(this));
	}
	render(color,x,y) {
		this.color = color;
		var gradient = this.ctx.createLinearGradient(0, 0, 500, 500);
		gradient.addColorStop(0, '#ffffff');
		gradient.addColorStop(0.5, color);
		gradient.addColorStop(1, '#000000');
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, 500, 500);
		//绘制提示圆圈
		this.ctx.strokeStyle = 'red';
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.arc(x, y, 9, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
}