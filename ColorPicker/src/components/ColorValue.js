import util from '../lib/util.js';
import watcher from './watcher.js';
export default class ColorValue {
	constructor(el,color) {
		this.el = document.querySelector(el);
		this.els = {};
		this.els.r = this.el.querySelector('#r');
		this.els.g = this.el.querySelector('#g');
		this.els.b = this.el.querySelector('#b');
		this.els.h = this.el.querySelector('#h');
		this.els.s = this.el.querySelector('#s');
		this.els.l = this.el.querySelector('#l');
		this.init();
		this.change(color);
	}
	init() {
		this.el.addEventListener('input',this.dealInput.bind(this));
	}
	change(color) {
		var {h,s,l} = color;
		var {r,g,b} = util.HSL2rgb(color);
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
		this.els.r.value = r;
		this.els.g.value = g;
		this.els.b.value = b;
		this.els.h.value = h;
		this.els.s.value = s;
		this.els.l.value = l;
	}
	dealInput(e) {
		var target = e.srcElement;
		var input = parseFloat(target.value);
		var validation = util.isValid(input,target.id);
		if(!validation){
			alert('Invalid input!');
			return;
		}
		this.model[target.id] = input;
		switch (target.id) {
			case 'r':
			case 'g':
			case 'b':
				var {h,s,l} = util.rgb2HSL(this.model);
				this.model.h = h;
				this.model.s = s;
				this.model.l = l;
				break;
			case 'h':
			case 's':
			case 'l':
				var {r,g,b} = util.HSL2rgb(this.model);
				this.model.r = r;
				this.model.g = g;
				this.model.b = b;
				break;
		}
		this.render();
		watcher.trigger('input',this.model);
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
				throw Error('Invalid parameter!');
		}
	}
	set(type,data) {
		type = type.toLowerCase();
		if(type === 'rgb'){
			data = util.rgb2HSL(data);
			this.change(data);
			watcher.trigger('input',this.model);
		}
		else if(type === 'hsl'){
			this.change(data);
			watcher.trigger('input',this.model);
		}
		else {
			throw Error('Invalid parameter!');
		}
	}
} 