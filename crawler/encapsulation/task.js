var page = require('webpage').create(),
	system = require('system'),
//	fs = require("fs"),
	key,
	device,
	file,
	option = require('./option.json'),
	result;
//读取配置文件
/*fs.encoding="GB2312";
//调用读的方法
file=fs.open("option.json",'r');
//没有读取一行的功能，只有读取全部的功能
option=JSON.parse(file.read());
//读取完毕后关闭
file.close();*/
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
		page.includeJs("http://libs.baidu.com/jquery/2.0.0/jquery.min.js", function() {
    		var num = page.evaluate(function() {
      			return $(".c-container").length;
    		});
    		var i = 0;
    		result = {
				code: 1,
				msg: '抓取成功',
				word: key,
				time: 0,
				device: device,
				dataList: []
			};
			try {
    			while(i < num) {
    				if(!page.loading){
    					var res= page.evaluate(function (i) {
    						var titleId = "#"+i+">h3";
    						var infoId = "#"+i+" .c-abstract";
    						var linkId = "#"+i+" a:first-child";
    						var picId = "#"+i+" img.c-img";
    						return JSON.stringify({
    							title: $(titleId).text(),  //结果条目的标题
             	  				info: $(infoId).text(), //摘要
             	  				link: $(linkId).attr("href"), //链接            
             	  				pic: $(picId).attr("src")  //缩略图地址
    						});
    					},i);
    					result.dataList.push(JSON.parse(res));
    					i++;
    				}
    			}
    			result.time = Date.now() - t;
    		}
    		catch (e){
    			result = {
					code: 0,
					msg: '抓取失败',
					word: key,
					time: 0,
					device: device,
					dataList: []
				};
    		}
    		console.log(JSON.stringify(result));
    		phantom.exit();
		});	
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