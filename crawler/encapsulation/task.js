var page = require('webpage').create(),
	system = require('system'),
	option = require('./option.json'),
	key,
	device,
	file,
	result;
key = system.args[1];
device = system.args[2];
page.settings.userAgent = option[device].userAgent;
page.viewportSize = {
  width: option[device].width,
  height: option[device].height
};
page.open('http://www.baidu.com/s?wd=' + encodeURIComponent(key), function(status) {
	if(status == "success"){
		var t = Date.now();
    	result = {
			code: 1,
			msg: '抓取成功',
			word: key,
			time: 0,
			dataList: []
		};
		try {
    		var dataList= page.evaluate(function () {
    			return $('.c-container').map(function() {
                	var data = {};
                		data.title = $(this).find('.t > a').text() || '';
                		data.info = $(this).find('.c-abstract').text() || '';
                		data.link = $(this).find('.t > a:first-child').attr('href') || '';
                		data.pic = $(this).find('img.c-img').attr('src') || '';
                	return data;
            	}).toArray();
    		});
    		result.dataList = dataList;
    		result.time = Date.now() - t;
    	}
    	catch (e){
    		result = {
				code: 0,
				msg: '抓取失败',
				word: key,
				time: 0,
				dataList: []
			};
    	}
    	console.log(JSON.stringify(result));
    	phantom.exit();
	}
	else {
		result = {
			code: 0,
			msg: '抓取失败',
			word: key,
			time: 0,
			device: device,
			dataList: []
		};
		console.log(JSON.stringify(result));
		phantom.exit();
	}
});