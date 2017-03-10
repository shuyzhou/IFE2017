class Slider {
	constructor(ele) {
		this.ele = document.querySelector(ele);
		this.init();
	}
	init() {
		const imgList = Array.from(this.ele.querySelectorAll('.image'));
		this.stage = [
			[1,2,3,4,5,6],
			[2,3,4,5,6,1],
			[3,4,5,6,1,2],
			[4,5,6,1,2,3],
			[5,6,1,2,3,4],
			[6,1,2,3,4,5]
		];
		this.count = 0;
		document.onclick = () => {
			this.count = this.count == 6?0:this.count;
			imgList.forEach((img,idx) => {
				img.style.animation = 'slider-stage'+this.stage[idx][this.count]+' 1s linear forwards';
			});
			this.count++;
		}
	}
}
const slider = new Slider('#slider');