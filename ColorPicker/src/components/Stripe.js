import util from '../lib/util.js';
import watcher from './watcher.js';
export default class Stripe {
	constructor(el) {
		this.el = document.querySelector(el);
		this.ctx = this.el.getContext('2d');
		this.init();
	}
	init() {
		this.render(12.5,246);
		//监听点击事件
		this.el.addEventListener('click',function(e) {
			var y = e.offsetY;
			this.render(12.5,y);
			//触发色带改变事件
			var color = util.getColor(this.ctx,12,y);
			watcher.trigger('areaChange',color);
		}.bind(this));
	}
	render(x,y) {
		//绘制颜色色带
		var gradient = this.ctx.createLinearGradient(0, 0, 0, 500);
		this.el.height = 500;
		this.el.width = 25;
		gradient.addColorStop(0, '#ff0000');
		gradient.addColorStop(0.2, '#ffff00');
		gradient.addColorStop(0.4, '#00ff00');
		gradient.addColorStop(0.5, '#00ffff');
		gradient.addColorStop(0.6, '#0000ff');
		gradient.addColorStop(0.8, '#db70db');
		gradient.addColorStop(1, '#ff0000');
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, 25, 500);
		//绘制提示圆圈
		this.ctx.strokeStyle = 'red';
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.arc(x, y, 9, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
}