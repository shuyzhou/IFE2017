export default {
	getColor: function (ctx,x,y) {
		var data = ctx.getImageData(x, y, 1, 1);
		var color = `rgb(${data.data[0]},${data.data[1]},${data.data[2]})`;
		return color;
	},
	getRGBValue: function (color) {
		return color
					.replace(/(?:\(|\)|rgb|RGB)*/g,"")
					.split(",")
					.map(function (str) {
						return parseInt(str);
					});
	},
	rgb2Hex: function (aColor) {
		var strHex = "#";
		for(var i=0; i<aColor.length; i++){
			var hex = aColor[i].toString(16);
			if(hex === "0"){
				hex += hex;	
			}
			strHex += hex;
		}
		if(strHex.length !== 7){
			strHex = strHex.substring(0,6);	
		}
		return strHex;
	},
	rgb2HSL: function (r,g,b) {
		r /= 255, g /= 255, b /= 255;
    	var max = Math.max(r, g, b), min = Math.min(r, g, b);
    	var h, s, l = (max + min) / 2;

    	if(max == min){
        	h = s = 0; //
    	}else{
        	var d = max - min;
        	s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        	switch(max){
            	case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            	case g: h = (b - r) / d + 2; break;
            	case b: h = (r - g) / d + 4; break;
        	}
        	h /= 6;
    	}
    	return [h, s, l];
	}
}