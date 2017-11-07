class Slider {
	constructor(ele) {
		this.ele = document.querySelector(ele);
		this.init();
	}
	init() {
		const wrapper = this.ele.querySelector('.wrapper');
		this.count = 0;
		document.onclick = () => {
			wrapper.style.transform = 'rotateY('+this.count*60+'deg)';
			this.count++;
		}
	}
}
const slider = new Slider('#slider');