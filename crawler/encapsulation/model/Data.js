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
DataDAO.prototype.save = function(obj, callback) {
var instance = new Data(obj);
	instance.save(function(err){
		callback(err);
	});
};
DataDAO.prototype.findByKey = function(word, callback) {
	Data.find({word:word}, function(err, obj){
		callback(err, obj);
	});
};
module.exports = new DataDAO();