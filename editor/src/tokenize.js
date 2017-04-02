Function.prototype.after = function(fn) {
	var self = this;
	return function () {
		var ret = self.apply(this,arguments);
		if(ret === 'next'){
			return fn.apply(this,arguments);
		}
		else {
			return ret;
		}
	}
};
var matchChain = matchCode.after(matchBlock).after(matchHead).after(matchList).after(matchLineFeed).after(matchParagraph);

function tokenize (md) {
	var result = [];
	var matches;
	while ( md ) {
		var res = matchChain(md);
		md = res.sofar;
		result.push(res.matches);
	}
	return result;
}

function matchCode(md) {
	var codeExp = /^(?:(?:\t|\s{4}).*?(?:\n|$))+/;
	var match;
	if((match = codeExp.exec(md))){
		md = md.substring(match[0].length);
		return {
			sofar: md,
			matches: {
				type: 'code',
				value: match[0]
			}
		};
	}
	else {
		return 'next';
	}
}
function matchBlock(md) {
	var blockExp = /^> (?:.|\n)*?(?:\n(?:\t|\s)\n|$)/;
	var match;
	var value;
	if((match = blockExp.exec(md))) {
		md = md.substring(match[0].length);
		value = match[0].split(/(?:^|(\n))> /).join('');
		value = tokenize(value);
		return {
			sofar: md,
			matches: {
				type: 'blockquote',
				value: value
			}
		};
	}
	else {
		return 'next';
	}
}

function matchHead(md) {
	var headExp = /^(?:\s*)(#{1,6})\s(.*?)(?:\n+|$)/;
	var match;
	if((match = headExp.exec(md))) {
		md = md.substring(match[0].length);
		return {
			sofar: md,
			matches: {
				type: 'h' + match[1].length,
				value: match[2]
			}
		};
	}
	else {
		return 'next';
	}
}
function matchList(md) {
	var liExp = /^(\*|\d+\.)\s(.*?(?:\n|$))/;
	var multilineExp = /^(?:(?:\t|\s{4}).*?(?:\n|$))+/;
	var match;
	var type;
	var value = '';
	if((match = liExp.exec(md))) {
		value = match[2];
		md = md.substring(match[0].length);
		if('*-+'.indexOf(match[1]) !== -1){
			type = 'ul';
		}
		else {
			type = 'ol';
		}
		if(match = multilineExp.exec(md)){
			value = shimIndent(value + match[0]);
			value = tokenize(value);
			md = md.substring(match[0].length);
		}
		return {
			sofar: md,
			matches: {
				type: type,
				value: value
			}
		};
	}
	else {
		return 'next';
	}
}

function matchLineFeed(md) {
	var feedExp = /^(?:(?:\s|\t)*(?:\n|$))+/;
	if((match = feedExp.exec(md))) {
		md = md.substring(match[0].length);
		return  {
			sofar: md,
			matches: {
				type: 'feed',
				value: ''
			}
		};
	}
	else {
		return 'next';
	}
}
function matchParagraph(md) {
	var paraExp = /(.*)?(?:\n|$)/;
	if((match = paraExp.exec(md))) {
		md = md.substring(match[0].length);
		return  {
			sofar: md,
			matches: {
				type: 'p',
				value: match[1]
			}
		};
	}
}
function shimIndent(str) {
	return str
		.split(/(\n)(?:\t|\s{4})/)
		.join('');
}

module.exports = tokenize;