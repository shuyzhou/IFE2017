var appFactory = function (id,base,data,size) {
	var wrapper = document.querySelector(id);
	var isBottom = function() {
		return Math.ceil(wrapper.scrollTop + wrapper.offsetHeight) === wrapper.scrollHeight;
	};
	var i = 0;
	return {
		size: size,
		init: function (){
			var self = this;
			for (; i < this.size; i++) {
				imageFactory(base+data[i].src,data[i].caption,wrapper);
			}
			wrapper.onscroll = function () {
				if (isBottom()) {
					self.add();
				}
			}
		},
		add: function (){
			for (var len = 0;len < this.size && i < data.length; len++,i++) {
				imageFactory(base+data[i].src,data[i].caption,wrapper);
			}
		}
	}
}

var base = "imgs/";
var data = [
	{src:'saber.jpg',caption:'Saber\/セイバー'},
	{src:'shirou.jpg',caption:'卫宫士郎\/えみや しろう'},
	{src:'rin.jpg',caption:'远坂凛\/とおさか りん'},
	{src:'archer.jpg',caption:'Archer\/アーチャー'},
	{src:'sakura.jpg',caption:'间桐樱\/まとう さくら'},
	{src:'rider.jpg',caption:'Rider\/ライダー'},
	{src:'illyasviel.jpg',caption:'伊利亚斯菲尔·冯·爱因斯贝伦/イリヤスフィール·フォン·アインツベルン'},
	{src:'berserker.jpg',caption:'Berserker\/バーサーカー'},
	{src:'kirei.jpg',caption:'言峰绮礼\/ことみね きれい'},
	{src:'gilgamesh.jpg',caption:'Gilgamesh\/ギルガメッシュ'},
	{src:'lancer.jpg',caption:'Lancer\/ランサー'},
	{src:'souichirou.jpg',caption:'葛木宗一郎\/くずき そういちろう'},
	{src:'caster.jpg',caption:'Caster\/キャスター'},
	{src:'assassin.jpg',caption:'Assassin\/アサシン'}
];
var app = appFactory('#content',base,data,4);
app.init();