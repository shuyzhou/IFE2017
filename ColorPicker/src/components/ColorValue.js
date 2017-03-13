import util from '../lib/util.js';
import watcher from './watcher.js';
export default class ColorValue {
	constructor(el,model) {
		this.el = document.querySelector(el);
		this.model = model;
		this.render();
	}
	change(color) {
		var [r,g,b] = util.getRGBValue(color);
		var [h,s,l] = util.rgb2HSL(r,g,b).map(function (val) {
			return val.toFixed(2);
		});
		this.model = {
			r:r,
			g:g,
			b:b,
			h:h,
			s:s,
			l:l
		};
		this.render();
	}
	render() {
		var {r,g,b,h,s,l} = this.model;
		this.el.querySelector('#red').value = r;
		this.el.querySelector('#green').value = g;
		this.el.querySelector('#blue').value = b;
		this.el.querySelector('#hue').value = h;
		this.el.querySelector('#saturation').value = s;
		this.el.querySelector('#lightness').value = l;
	}
	get(type) {
		type = type.toLowerCase();
		switch(type){
			case 'rgb':
				return {
					r:this.model.r,
					g:this.model.g,
					b:this.model.b
				};break;
			case 'hsl':
				return {
					h:this.model.h,
					s:this.model.s,
					l:this.model.l
				};break;
			case 'hex':
				return util.rgb2Hex([this.model,r,this.model,g,this.model,b]);break;
			case 'default':
				throw Error('参数错误！');
		}
	}
} 