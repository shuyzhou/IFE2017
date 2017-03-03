const exec = require('child_process').exec;
module.exports = function(cmd){
	return new Promise(function (resolve,reject) {
		exec(cmd, function (err, stdout, stderr) {
			if(err) reject(err);
			if(stderr) reject(stderr);
  			const result = JSON.parse(stdout);
  			resolve(result);
		});
	});
}