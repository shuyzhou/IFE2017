//AOP实现职责链
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
var escapeCode = require('./escapeCode.js');
var matchChain = matchCodeBlock.after(matchBlock).after(matchHead).after(matchList).after(matchLineFeed).after(matchParagraph);

function tokenize (md) {
	var result = [];
	var matches;
	md = matchLink(md);
	while ( md ) {
		var res = matchChain(md);
		md = res.sofar;
		result.push(res.matches);
	}
	return result;
}

function matchLink(str) {
	var inlineLinkExp = /\[(.*?)\]\((.*?)\s?(?:\"(.*?)\")?\)/g;
	var refLinkExp = /\[(.+?)\](\[.+?\])/g;
	str = str.replace(inlineLinkExp,function (match,p1,p2,p3) {
		return `<a href="${p2||''}"${p3 && ` title=${p3}`||''}>${p1||''}</a>`;
	});
	str = str.replace(refLinkExp,function (s,p1,p2) {
		var refExp = p2 || p1 + ': (.+?)[\s\t\n]';
		var match;
		if((match = refExp.exec(str))){
			return `<a href="${match[1]}">${p1}</a>`;
		}
		else {
			return s;
		}
	});
	return str;
}

function matchCodeBlock(md) {
	var codeExp = /^(?:(?:\t|\s{4}).*?(?:\n|$))+/;
	var match;
	if((match = codeExp.exec(md))){
		md = md.substring(match[0].length);
		return {
			sofar: md,
			matches: {
				type: 'codeBlock',
				value: match[0]
			}
		};
	}
	else {
		return 'next';
	}
}
function matchBlock(md) {
	var blockExp = /^(?:>\s(?:.|\n)*?(?:\n(?:\t|\s)*\n|$))+/;
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
	var headExp = /^(?:\s*)(#{1,6})\s(.*?)(?:\n+|$|\s#{1,6})/;
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
	var liExp = /^([\*\+\-]|\d+\.)\s(.*?(?:\n|$))/;
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