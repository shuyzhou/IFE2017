import watcher from './watcher.js';
import Panel from './Panel.js';
import Stripe from './Stripe.js';
import ColorValue from './ColorValue.js';
export default class Picker {
	constructor(el,color) {
		this.el = document.querySelector(el);
		this.panel = new Panel('#panel',color);
		this.stripe = new Stripe('#stripe',color.h);
		this.colorValue = new ColorValue('#colorValue',color);
		this.init();
	}
	init() {
		watcher.listen('areaChange',this.panel.render,this.panel);
		watcher.listen('colorChange',this.colorValue.change,this.colorValue);
		watcher.listen('input',this.stripe.dealInput,this.stripe);
		watcher.listen('input',this.panel.dealInput,this.panel);
		this.stripe.init();
		this.panel.init();
	}
	get(type) {
		return this.colorValue.get(type);
	}
	set(type,data) {
		this.colorValue.set(type,data);
		return true;
	}
}