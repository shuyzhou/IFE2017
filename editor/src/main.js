var tokenize = require('./tokenize.js');
var join = require('./join.js');
var input = document.querySelector('#in');
var output = document.querySelector('#out');
hljs.highlightBlock(output);
input.addEventListener('keyup',function () {
	var result = tokenize(this.value);
	output.innerHTML = join(result);
	hljs.highlightBlock(output);
});