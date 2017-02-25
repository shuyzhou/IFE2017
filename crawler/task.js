var page = require('webpage').create(),
	system = require('system'),
	key,
	result;
key = system.args[1];
page.open('http://www.baidu.com/s?wd=' + key, function(status) {
	if(status == "success"){
		var t = Date.now();
		page.includeJs("http://libs.baidu.com/jquery/2.0.0/jquery.min.js", function() {
    		var num = page.evaluate(function() {
      			return $(".c-container").length;
    		});
    		var i = 1;
    		result = {
				code: 1,
				msg: '抓取成功',
				word: key,
				time: 0,
				dataList: []
			};
			try {
    			while(i <= num) {
    				if(page.loadingProgress=100){
    					var title = page.evaluate(function (i) {
    						var titleId = "#"+i+">h3";
    						return $(titleId).text();
    					},i);
    					var info = page.evaluate(function (i) {
    						var infoId = "#"+i+" .c-abstract";
    						return $(infoId).text();
    					},i);
    					var link= page.evaluate(function (i) {
    						var linkId = "#"+i+" a:first-child";
    						return $(linkId).attr("href");
    					},i);
    					var pic= page.evaluate(function (i) {
    						var picId = "#"+i+" img.c-img";
    						return $(picId).attr("src");
    					},i);
    					result.dataList.push({
    						title: title,  //结果条目的标题
             	  			info: info, //摘要
             	  			link: link, //链接            
             	  			pic: pic  //缩略图地址
    					});
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
			dataList: []
		};
		console.log(JSON.stringify(result));
		phantom.exit();
	}

});