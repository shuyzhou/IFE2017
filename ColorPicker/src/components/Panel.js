import util from '../lib/util.js';
import watcher from './watcher.js';
export default class Panel {
	constructor(el,color) {
		this.el = document.querySelector(el);
		this.ctx = this.el.getContext('2d');
		this.color = util.rgb2HSB(color);
		this.size = 500;
	}
	init() {
		this.el.height = this.size;
		this.el.width = this.size;
		this.render(this.color.h,this.color.s*this.size,this.color.b*this.size);
		//监听点击事件
		this.el.addEventListener('click',function (e) {
			var x = e.offsetX,
				y = e.offsetY;
			this.render(this.color.h,x,y);
			//触发颜色改变事件
			var rgb = util.getRGBValue(this.ctx,x,y);
			watcher.trigger('colorChange',rgb);
		}.bind(this));
	}
	dealInput(color) {
		var {h,s,b} = util.rgb2HSB(color);
		this.render(h,b*this.size,s*this.size);
	}
	render(h,x = 500,y = 500) {
		/* @param h range(0,360)
		 * @param x range(0,500)
		 * @param y range(0,500)
		*/
		//绘制垂直方向饱和度渐变
		this.color.h = h;
		var sGradient = this.ctx.createLinearGradient(0, 0, 0, 500);
		sGradient.addColorStop(0, 'white');
		sGradient.addColorStop(1, `hsl(${h},100%,50%)`);
		this.ctx.fillStyle = sGradient;
		this.ctx.fillRect(0, 0, 500, 500);
		//叠加水平方向亮度渐变
		var lGradient = this.ctx.createLinearGradient(0, 0, 500, 0);
    	lGradient.addColorStop(0, 'rgba(0,0,0,1)');
    	lGradient.addColorStop(1, 'rgba(0,0,0,0)');
    	this.ctx.fillStyle = lGradient;
    	this.ctx.fillRect(0, 0, 500, 500);
		//绘制提示圆圈
		this.ctx.strokeStyle = 'white';
		this.ctx.beginPath();
		this.ctx.lineWidth = 4;
		this.ctx.arc(x, y, 9, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
}