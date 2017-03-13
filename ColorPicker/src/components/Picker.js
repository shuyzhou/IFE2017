import watcher from './watcher.js';
import Panel from './Panel.js';
import Stripe from './Stripe.js';
import ColorValue from './ColorValue.js';
export default class Picker {
	constructor(el) {
		this.el = document.querySelector(el);
		this.panel = new Panel('#panel','#00ffff');
		this.stripe = new Stripe('#stripe');
		this.colorValue = new ColorValue('#colorValue',{
			r:0,
			g:255,
			b:237,
			h:0.49,
			s:1,
			l:0.5
		});
		this.init();
	}
	init() {
		watcher.listen('areaChange',this.panel.render,this.panel);
		watcher.listen('colorChange',this.colorValue.change,this.colorValue);
	}
	get(type) {
		return this.colorValue.get(type);
	}
}