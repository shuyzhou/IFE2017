export default {
	getRGBValue: function (ctx,x,y) {
		var data = ctx.getImageData(x, y, 1, 1);
		var color = `rgb(${data.data[0]},${data.data[1]},${data.data[2]})`;
		color = color
					.replace(/(?:\(|\)|rgb|RGB)*/g,"")
					.split(",")
					.map(function (str) {
						return parseInt(str);
					});
		return {r:color[0],g:color[1],b:color[2]};
	},
	rgb2Hex: function (color) {
		var strHex = "#";
		for(var i=0; i<color.length; i++){
			var hex = color[i].toString(16);
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
    	var max = Math.max(r, g, b), 
    		min = Math.min(r, g, b);
    	var h, s, l = (max + min) / 2;
    	var d = max - min;

    	if(max == min){
        	h = s = 0; 
    	}else{
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
	rgb2HSB: function(color) {
        var {r,g,b} = color;
        r /= 255, g /= 255, b /= 255;
        var min = Math.min(r, g, b), 
            max = Math.max(r, g, b),
            d = max - min;
        var h,s;

        if( d == 0 ) { 
            h = s = 0;
        } else { 
            s = d / max;
            if(r == max) {
                h = (g - b)/d;
            }
            else if(g == max) {
                h = 2 + (b - r)/d; // between cyan & yellow
            }
            else {
                h = 4 + (r - g)/d; // between magenta & cyan
            }
        }
        h = ((h * 60) + 360) % 360;
        return {h:h,s:s,b:max};
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
		return parseInt(255 * v);
	},
	fixInput: function(value,type){
		switch (type) {
			case 'r':
			case 'g':
			case 'b':
				return value = (value < 0) ? 0 : (value > 255) ? 255 : value;
			case 'h':
			case 's':
			case 'l':
				return value = (value < 0) ? 0 : (value > 1) ? 1 : value;
		}
	}
}