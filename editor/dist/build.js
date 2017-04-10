/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var getContent = {
	'head': function (i,group) {
		return '<' + group[i].type + '>' + group[i].value + '</' + group[i].type + '>';
	},
	'codeBlock': function (i,group) {
		var code = hljs.highlightAuto(group[i].value).value;
		return '<pre><code>' + code + '</pre></code>';
	},
	'blockquote': function (i,group) {
		var inner = group[i].value;
		if(typeof  inner !== 'string'){
			inner = join(inner);
		}
		return '<blockquote>' + inner + '</blockquote>';
	},
	'ol': function (i,group) {
		var inner = this.li(group[i].value);
		while(group[i+1] && group[i+1].type === 'ol'){
			inner += this.li(group.splice(i+1,1)[0].value);
		}
		return '<ol>' + inner + '</ol>';
	},
	'ul': function (i,group) {
		var inner = this.li(group[i].value);
		while(group[i+1] && group[i+1].type === 'ul'){
			inner += this.li(group.splice(i+1,1)[0].value);
		}
		return '<ul>' + inner + '</ul>';
	},
	'p': function (i,group) {
		var inner = group[i].value;
		while(group[i+1] && group[i+1].type === 'p'){
			inner += group.splice(i+1,1)[0].value;
		}
		return '<p>' + 	matchInlineCode(inner) + '</p>';
	},
	'feed': function () {
		return '';
	},
	'li': function (value) {
		if(typeof value !== 'string'){
			value = join(value);
		}
		return '<li>' + value + '</li>';
	},
	'h1': function (i,group) {
		return this.head(i,group);
	},
	'h2': function (i,group) {
		return this.head(i,group);
	},
	'h3': function (i,group) {
		return this.head(i,group);
	},
	'h4': function (i,group) {
		return this.head(i,group);
	},
	'h5': function (i,group) {
		return this.head(i,group);
	},
	'h6': function (i,group) {
		return this.head(i,group);
	}
}
function matchInlineCode(str) {
	var codeExp = /(`+)([^`])?(.*?)([^`])\1([^`]|$)/g;
	return str.replace(codeExp,function (match,p1,p2,p3,p4,p5) {
		var code = '';
		if(p3){
			code = p3;
		}
		if(p2 && p2 !== ' '){
			code = p2 + code;
		}
		if(p4 && p4 !== ' '){
			code = code + p4;
		}
		code = escapeCode(code);
		return '<code>' + code + '</code>' + p5;
	});
}

function escapeCode(str) {
	return str
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;');
}
function join (group) {
	var html = '';
	for (var i = 0; i < group.length; i++) {
		html += getContent[group[i].type](i,group);
	}
	return html;
}

module.exports = join;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(1);
var join = __webpack_require__(0);
var input = document.querySelector('#in');
var output = document.querySelector('#out');
var text = `这是一个阉割版markdown解析器

对markdown解析主要参考[这里](http://daringfireball.net/projects/markdown/syntax#header)
# 标题
支持类\`atx\`形式的标题，并支持选择性的闭合
# H1
## H2
### H3
#### H4 #
##### H5 ##
###### H6
# 列表
支持有序列表和无序列表，并支持多个段落
*   这是一段无序列表。
    这是一段无序列表。
    这是一段无序列表。
*   这是一段无序列表
1. 有序列表
5. 有序列表
3. 有序列表
# 引用
支持区块引用
> 这是一段引用。这是一段引用。
> 这是一段引用。
这是一段引用。

> 这是另一段引用。这是另一段引用。
这是另一段引用。

# 代码块
支持行内代码和缩进产生的代码块，代码块区域中的&、<和>会被转义，暂不支持由反引号\` \`\`\` \`包括的代码块
    <h1>hello</h1>
    &alt
# todo
1. 实现由反引号\`\`\`包括的代码块的解析
2. 实现链接、图片解析
3. 看marked源码
# 最后
欢迎找BUG `;
input.innerHTML = text;
parse();
input.addEventListener('keyup',parse);
function parse() {
	var result = tokenize(input.value);
	output.innerHTML = join(result);
}

/***/ })
/******/ ]);