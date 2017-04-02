var getContent = {
	'head': function (i,group) {
		return '<' + group[i].type + '>' + group[i].value + '</' + group[i].type + '>';
	},
	'code': function (i,group) {
		var code = '<pre><code>' + escape(group[i].value) + '</code></pre>';
		return code;
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
		return '<p>' + inner + '</p>';
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
function join (group) {
	var html = '';
	for (var i = 0; i < group.length; i++) {
		html += getContent[group[i].type](i,group);
	}
	return html;
}

function escape(str) {
	return str
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;');
}

module.exports = join;