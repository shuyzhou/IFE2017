export default {
	getRGBValue: function (ctx,x,y) {
		var data = ctx.getImageData(x, y, 1, 1);
		var color = `rgb(${data.data[0]},${data.data[1]},${data.data[2]})`;
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
	rgb2HSL: function (color) {
		var {r,g,b} = color;
		r /= 255, g /= 255, b /= 255;
    	var max = Math.max(r, g, b), min = Math.min(r, g, b);
    	var h, s, l = (max + min) / 2;

    	if(max == min){
        	h = s = 0; 
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
    	return {h:h, s:s, l:l};
	},
	HSL2rgb: function (color) {
		var {h,s,l} = color;
		var p, q;
		var r, g, b;
		if (s == 0)
			r = g = b = (l * 255);
		else {
			if (l <= 0.5)
				q = l * (s + 1);
			else
				q = l + s - l * s;
			p = l * 2 - q;
			r = this.HueToRgb(p, q, h + 1/3);
			g = this.HueToRgb(p, q, h);
			b = this.HueToRgb(p, q, h - 1/3);
		}
		return {r: r, g: g, b: b};
	},
	HueToRgb: function (p, q, h) {
		var v;
		if (h < 0)
			h += 1;
		else if (h > 1)
			h -= 1;

		if (6 * h < 1)
			v = p + (q - p) * h * 6;
		else if (2 * h < 1)
			v = q;
		else if (3 * h < 2)
			v = p + (q - p) * (2/3 - h) * 6;
		else
			v = p;
		return (255 * v).toFixed(0);
	},
	isValid: function(value,type){
		switch (type) {
			case 'r':
			case 'g':
			case 'b':
				if(value >= 0 && value <= 255)return true;
				break;
			case 'h':
			case 's':
				if(value >= 0 && value <= 1)return true;break;
			case 'l':
				if(value >= 0 && value <= 0.5)return true;break;
		}
		return false;
	}
}