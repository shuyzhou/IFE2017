var Event = function (){
	this.handlers = {};
}
Event.prototype = {
	constructor : Event,
	listen: function (key,handler,content = this) {
		if(!this.handlers[key]){
			this.handlers[key] = [];
		}
		this.handlers[key].push(handler.bind(content));
	},
	trigger: function (key,args) {
		var handlers = this.handlers[key];
		if(!handlers){
			return;
		}
		handlers.forEach(function (handler) {
			if(!!args){
				handler(args);
			}
			else {
				handler();
			}
		});
	}
}