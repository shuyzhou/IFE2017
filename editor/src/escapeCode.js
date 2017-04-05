function escapeCode(str) {
	return str
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;');
}

module.exports = escapeCode;