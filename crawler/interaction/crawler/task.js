const phantom = require('phantom');
const request = require('request');
const fs = require('fs');
const option = require('./option.json');
module.exports = task;
async function task(key,device) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    let result;
    if(!!device){
		page.settings.userAgent = option[device].userAgent;
		page.viewportSize = {
	  		width: option[device].width,
	  		height: option[device].height
		};
	};
	const url = `http://www.baidu.com/s?wd=${encodeURIComponent(key)}`
    result = await crawler(url);
    return result;
//    await instance.exit();
    //private function to get result
    async function crawler(url) {
		const status = await page.open(url);
		const t = Date.now();
		let result;
		if (status !== "success") {
			throw Error({ message: '打开页面失败!' });
		}
		else {
			try {
    			let dataList = await page.evaluate(function (){
    				return $('.c-container').map(function (){
                		var data = {};
                		data.title = $(this).find('.t > a').text() || '';
                		data.info = $(this).find('.c-abstract').text() || '';
                		data.link = $(this).find('.t > a:first-child').attr('href') || '';
                		data.pic = $(this).find('img.c-img').attr('src') || '';
                		return data;
            		}).toArray();
    			});
    			saveImages(dataList);
    			result = {
					code: 1,
					msg: '抓取成功',
					word: key,
					time: Date.now() - t,
					device:device,
					dataList: dataList
				};
    		}
    		catch (e){
    			throw Error({ message: e });
    		}
		}
		await instance.exit();
		return result;
	}
	//private function to download images
	function saveImages(dataList) {
		dataList.forEach(function (data){
      		if (!!data.pic) {
        		const picId = uid();
        		const fileName = `public/images/${picId}.jpg`;
        		request(data.pic).pipe(fs.createWriteStream(fileName));
        		data.picId = `images/${picId}.jpg`;
      		}
  		});
	}
	//private function
	function uid() {
  		return Math.random().toString(36).slice(2);
	}
};