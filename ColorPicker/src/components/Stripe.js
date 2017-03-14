import util from '../lib/util.js';
import watcher from './watcher.js';
export default class Stripe {
	constructor(el,color) {
		let {h} = util.rgb2HSB(color);
		this.el = document.querySelector(el);
		this.ctx = this.el.getContext('2d');
		this.hue = h < 1 ? h : h/360;
		this.width = 25;
		this.height = 500;
	}
	init() {
		this.render(this.hue*this.height);
		//监听点击事件
		this.el.addEventListener('click',function(e) {
			var y = e.offsetY;
			this.render(y);
			//触发色带改变事件
			watcher.trigger('areaChange',(y/this.height)*360);
		}.bind(this));
	}
	dealInput(color) {
		var {h} = util.rgb2HSB(color);
		this.render(h/360*this.height);
	}
	render(y) {
		//绘制颜色色带
		var gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
		this.el.height = this.height;
		this.el.width = this.width;
		gradient.addColorStop(0, '#ff0000');
		gradient.addColorStop(0.167, '#ffff00');
		gradient.addColorStop(0.333, '#00ff00');
		gradient.addColorStop(0.5, '#00ffff');
		gradient.addColorStop(0.667, '#0000ff');
		gradient.addColorStop(0.833, '#ff00ff');
		gradient.addColorStop(1, '#ff0000');
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.width, this.height);
		//绘制提示圆圈
		this.ctx.strokeStyle = 'white';
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.arc(this.width/2, y, 9, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
}