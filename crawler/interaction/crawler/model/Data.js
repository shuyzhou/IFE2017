const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//利用mongoose连接到本地的Mongodb的crawler数据库
mongoose.connect('mongodb://localhost/crawler');
const dataSchema = new mongoose.Schema({
	code: Number,
    msg: String,
    word: String,
	time: Number,
	device: String,
	dataList: Array
});
const Data = mongoose.model('Data', dataSchema);
const DataDAO = function(){};
DataDAO.prototype.save = function (obj){
	return new Promise(function (resolve,reject) {
		const instance = new Data(obj);
		instance.save(function(err){
			if(err){
				reject(err);
			}
			else {
				resolve();
			}
		});
	});
};
DataDAO.prototype.findByKey = function (word) {
	return new Promise(function (resolve,reject) {
		Data.find({word:word}, function(err, obj){
			if(err)	{
				reject(err);
			}
			else {
				resolve(obj);
			}
		});
	});
}
module.exports = new DataDAO();