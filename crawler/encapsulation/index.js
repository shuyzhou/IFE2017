const	http = require("http"),
		url = require("url"),
		exec = require('child_process').exec,
		dataDAO = require("./model/data");

http.createServer((req, res) => { 
    const param = url.parse(req.url,true).query; 
    const word = param.word;
    const device = param.device;
    let result;
    res.writeHead(200, {"Content-Type": "text/plain"});
    if(!!word && !!device){
    	exec('phantomjs task.js ' + word + ' ' + device, (err, stdout, stderr) => {
  			if (err) {
    			console.error(err);
    			return;
  			}
  			result = JSON.parse(stdout);
  			dataDAO.save(result,function (err,data) {
  				if (err) console.error(err);
			});
/*			dataDAO.findByKey(word,function (err, result){
  				if (err) console.error(err);
  				console.log(result);
			});*/
		});
		res.write("Crawling...");
    }
    else {
    	res.write("The crawler need word and divice name!");
        
    }
    res.end();  
}).listen(8000);  
console.log('server started');