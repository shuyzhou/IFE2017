const async = require('async');
const crawler = require('../crawler/task.js');
const dataDAO = require("../crawler/model/data");
module.exports = async function run(socket){
	socket.on('crawler', async function (data) {
		var queue = async.queue(function(data, callback) {
        let {word,page,device} = data;
        task(socket,word,page,device);
    		callback();
		}, 5);
		data.deviceList.forEach(function (device) {
  			queue.push({word: data.word,page: data.page,device: device}
        ,function (err) {
  			   console.log(err);
  		  });
	});
}

async function task(socket,word,page,device) {
  let result = await crawler(word,page,device);
  await dataDAO.save(result);
  socket.emit('result',result);
  return result;
}