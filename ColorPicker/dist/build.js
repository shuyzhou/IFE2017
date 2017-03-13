/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Picker = __webpack_require__(1);

	var _Picker2 = _interopRequireDefault(_Picker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var picker = new _Picker2.default('#picker', {
		h: 0.49,
		s: 1,
		l: 0.5
	});
	picker.set('rgb', {
		r: 45,
		g: 66,
		b: 218
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _watcher = __webpack_require__(22);

	var _watcher2 = _interopRequireDefault(_watcher);

	var _Panel = __webpack_require__(24);

	var _Panel2 = _interopRequireDefault(_Panel);

	var _Stripe = __webpack_require__(48);

	var _Stripe2 = _interopRequireDefault(_Stripe);

	var _ColorValue = __webpack_require__(49);

	var _ColorValue2 = _interopRequireDefault(_ColorValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Picker = function () {
		function Picker(el, color) {
			(0, _classCallCheck3.default)(this, Picker);

			this.el = document.querySelector(el);
			this.panel = new _Panel2.default('#panel', color);
			this.stripe = new _Stripe2.default('#stripe', color.h);
			this.colorValue = new _ColorValue2.default('#colorValue', color);
			this.init();
		}

		(0, _createClass3.default)(Picker, [{
			key: 'init',
			value: function init() {
				_watcher2.default.listen('areaChange', this.panel.render, this.panel);
				_watcher2.default.listen('colorChange', this.colorValue.change, this.colorValue);
				_watcher2.default.listen('input', this.stripe.dealInput, this.stripe);
				_watcher2.default.listen('input', this.panel.dealInput, this.panel);
				this.stripe.init();
				this.panel.init();
			}
		}, {
			key: 'get',
			value: function get(type) {
				return this.colorValue.get(type);
			}
		}, {
			key: 'set',
			value: function set(type, data) {
				this.colorValue.set(type, data);
				return true;
			}
		}]);
		return Picker;
	}();

	exports.default = Picker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(4);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	var $Object = __webpack_require__(9).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(7);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(17), 'Object', {defineProperty: __webpack_require__(13).f});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(8)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(10)
	  , hide      = __webpack_require__(12)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(13)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(17) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(16)
	  , toPrimitive    = __webpack_require__(20)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(17) && !__webpack_require__(18)(function(){
	  return Object.defineProperty(__webpack_require__(19)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	  , document = __webpack_require__(8).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Event = __webpack_require__(23);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var watcher = new _Event2.default();
	exports.default = watcher;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Event = function () {
		function Event() {
			(0, _classCallCheck3.default)(this, Event);

			this.handlers = {};
		}

		(0, _createClass3.default)(Event, [{
			key: "listen",
			value: function listen(key, handler) {
				var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

				if (!this.handlers[key]) {
					this.handlers[key] = [];
				}
				this.handlers[key].push(handler.bind(content));
			}
		}, {
			key: "trigger",
			value: function trigger(key) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var handlers = this.handlers[key];
				if (!handlers) {
					return;
				}
				handlers.forEach(function (handler) {
					if (!!args) {
						handler.apply(undefined, args);
					} else {
						handler();
					}
				});
			}
		}]);
		return Event;
	}();

	exports.default = Event;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _assign = __webpack_require__(25);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _util = __webpack_require__(47);

	var _util2 = _interopRequireDefault(_util);

	var _watcher = __webpack_require__(22);

	var _watcher2 = _interopRequireDefault(_watcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Panel = function () {
		function Panel(el, color) {
			(0, _classCallCheck3.default)(this, Panel);

			this.el = document.querySelector(el);
			this.ctx = this.el.getContext('2d');
			this.color = (0, _assign2.default)({}, color);
			this.color.h = this.color.h < 1 ? this.color.h * 360 : this.color.h;
			this.size = 500;
		}

		(0, _createClass3.default)(Panel, [{
			key: 'init',
			value: function init() {
				this.el.height = this.size;
				this.el.width = this.size;
				this.render(this.color.h, this.color.s * this.size, this.color.l * 2 * this.size);
				//监听点击事件
				this.el.addEventListener('click', function (e) {
					var x = e.offsetX,
					    y = e.offsetY;
					this.render(this.color.h * 360, x, y);
					//触发颜色改变事件
					_watcher2.default.trigger('colorChange', this.color);
				}.bind(this));
			}
		}, {
			key: 'dealInput',
			value: function dealInput(color) {
				this.render(color.h * 360, color.s * this.size, color.l * 2 * this.size);
			}
		}, {
			key: 'render',
			value: function render(h, x, y) {
				/* @param h range(0,360)
	    * @param x range(0,500)
	    * @param y range(0,500)
	   */
				this.color = {
					h: h / 360,
					s: y / this.size,
					l: x / 2 / this.size
				};
				//绘制垂直方向饱和度渐变
				var sGradient = this.ctx.createLinearGradient(0, 0, 0, 500);
				sGradient.addColorStop(0, 'hsl(' + h + ',0%,50%)');
				sGradient.addColorStop(1, 'hsl(' + h + ',100%,50%)');
				this.ctx.fillStyle = sGradient;
				this.ctx.fillRect(0, 0, 500, 500);
				//叠加水平方向亮度渐变
				var lGradient = this.ctx.createLinearGradient(0, 0, 500, 0);
				lGradient.addColorStop(0, 'rgba(0,0,0,1)');
				lGradient.addColorStop(1, 'rgba(0,0,0,0)');
				this.ctx.fillStyle = lGradient;
				this.ctx.fillRect(0, 0, 500, 500);
				//绘制提示圆圈
				this.ctx.strokeStyle = 'white';
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.arc(x, y, 9, 0, 2 * Math.PI);
				this.ctx.stroke();
			}
		}]);
		return Panel;
	}();

	exports.default = Panel;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	module.exports = __webpack_require__(9).Object.assign;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(7);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(28)});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(29)
	  , gOPS     = __webpack_require__(44)
	  , pIE      = __webpack_require__(45)
	  , toObject = __webpack_require__(46)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(18)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(43);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(31)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys')
	  , uid    = __webpack_require__(42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 45 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		getRGBValue: function getRGBValue(ctx, x, y) {
			var data = ctx.getImageData(x, y, 1, 1);
			var color = "rgb(" + data.data[0] + "," + data.data[1] + "," + data.data[2] + ")";
			return color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",").map(function (str) {
				return parseInt(str);
			});
		},
		rgb2Hex: function rgb2Hex(aColor) {
			var strHex = "#";
			for (var i = 0; i < aColor.length; i++) {
				var hex = aColor[i].toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = strHex.substring(0, 6);
			}
			return strHex;
		},
		rgb2HSL: function rgb2HSL(color) {
			var r = color.r,
			    g = color.g,
			    b = color.b;

			r /= 255, g /= 255, b /= 255;
			var max = Math.max(r, g, b),
			    min = Math.min(r, g, b);
			var h,
			    s,
			    l = (max + min) / 2;

			if (max == min) {
				h = s = 0;
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);break;
					case g:
						h = (b - r) / d + 2;break;
					case b:
						h = (r - g) / d + 4;break;
				}
				h /= 6;
			}
			return { h: h, s: s, l: l };
		},
		HSL2rgb: function HSL2rgb(color) {
			var h = color.h,
			    s = color.s,
			    l = color.l;

			var p, q;
			var r, g, b;
			if (s == 0) r = g = b = l * 255;else {
				if (l <= 0.5) q = l * (s + 1);else q = l + s - l * s;
				p = l * 2 - q;
				r = this.HueToRgb(p, q, h + 1 / 3);
				g = this.HueToRgb(p, q, h);
				b = this.HueToRgb(p, q, h - 1 / 3);
			}
			return { r: r, g: g, b: b };
		},
		HueToRgb: function HueToRgb(p, q, h) {
			var v;
			if (h < 0) h += 1;else if (h > 1) h -= 1;

			if (6 * h < 1) v = p + (q - p) * h * 6;else if (2 * h < 1) v = q;else if (3 * h < 2) v = p + (q - p) * (2 / 3 - h) * 6;else v = p;
			return (255 * v).toFixed(0);
		},
		isValid: function isValid(value, type) {
			switch (type) {
				case 'r':
				case 'g':
				case 'b':
					if (value >= 0 && value <= 255) return true;
					break;
				case 'h':
				case 's':
					if (value >= 0 && value <= 1) return true;break;
				case 'l':
					if (value >= 0 && value <= 0.5) return true;break;
			}
			return false;
		}
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _util = __webpack_require__(47);

	var _util2 = _interopRequireDefault(_util);

	var _watcher = __webpack_require__(22);

	var _watcher2 = _interopRequireDefault(_watcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Stripe = function () {
		function Stripe(el, hue) {
			(0, _classCallCheck3.default)(this, Stripe);

			this.el = document.querySelector(el);
			this.ctx = this.el.getContext('2d');
			this.hue = hue < 1 ? hue : hue / 360;
			this.width = 25;
			this.height = 500;
		}

		(0, _createClass3.default)(Stripe, [{
			key: 'init',
			value: function init() {
				this.render(this.hue * this.height);
				//监听点击事件
				this.el.addEventListener('click', function (e) {
					var y = e.offsetY;
					this.render(y);
					//触发色带改变事件
					_watcher2.default.trigger('areaChange', y / this.height * 360);
				}.bind(this));
			}
		}, {
			key: 'dealInput',
			value: function dealInput(color) {
				this.render(color.h * this.height);
			}
		}, {
			key: 'render',
			value: function render(y) {
				//绘制颜色色带
				var gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
				this.el.height = this.height;
				this.el.width = this.width;
				gradient.addColorStop(0, '#ff0000');
				gradient.addColorStop(0.167, '#ffff00');
				gradient.addColorStop(0.333, '#00ff00');
				gradient.addColorStop(0.5, '#00ffff');
				gradient.addColorStop(0.667, '#0000ff');
				gradient.addColorStop(0.833, '#ff00ff');
				gradient.addColorStop(1, '#ff0000');
				this.ctx.fillStyle = gradient;
				this.ctx.fillRect(0, 0, this.width, this.height);
				//绘制提示圆圈
				this.ctx.strokeStyle = 'white';
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.arc(this.width / 2, y, 9, 0, 2 * Math.PI);
				this.ctx.stroke();
			}
		}]);
		return Stripe;
	}();

	exports.default = Stripe;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _util = __webpack_require__(47);

	var _util2 = _interopRequireDefault(_util);

	var _watcher = __webpack_require__(22);

	var _watcher2 = _interopRequireDefault(_watcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColorValue = function () {
		function ColorValue(el, color) {
			(0, _classCallCheck3.default)(this, ColorValue);

			this.el = document.querySelector(el);
			this.els = {};
			this.els.r = this.el.querySelector('#r');
			this.els.g = this.el.querySelector('#g');
			this.els.b = this.el.querySelector('#b');
			this.els.h = this.el.querySelector('#h');
			this.els.s = this.el.querySelector('#s');
			this.els.l = this.el.querySelector('#l');
			this.init();
			this.change(color);
		}

		(0, _createClass3.default)(ColorValue, [{
			key: 'init',
			value: function init() {
				this.el.addEventListener('input', this.dealInput.bind(this));
			}
		}, {
			key: 'change',
			value: function change(color) {
				var h = color.h,
				    s = color.s,
				    l = color.l;

				var _util$HSL2rgb = _util2.default.HSL2rgb(color),
				    r = _util$HSL2rgb.r,
				    g = _util$HSL2rgb.g,
				    b = _util$HSL2rgb.b;

				this.model = {
					r: r,
					g: g,
					b: b,
					h: h,
					s: s,
					l: l
				};
				this.render();
			}
		}, {
			key: 'render',
			value: function render() {
				var _model = this.model,
				    r = _model.r,
				    g = _model.g,
				    b = _model.b,
				    h = _model.h,
				    s = _model.s,
				    l = _model.l;

				this.els.r.value = r;
				this.els.g.value = g;
				this.els.b.value = b;
				this.els.h.value = h;
				this.els.s.value = s;
				this.els.l.value = l;
			}
		}, {
			key: 'dealInput',
			value: function dealInput(e) {
				var target = e.srcElement;
				var input = parseFloat(target.value);
				var validation = _util2.default.isValid(input, target.id);
				if (!validation) {
					alert('Invalid input!');
					return;
				}
				this.model[target.id] = input;
				switch (target.id) {
					case 'r':
					case 'g':
					case 'b':
						var _util$rgb2HSL = _util2.default.rgb2HSL(this.model),
						    h = _util$rgb2HSL.h,
						    s = _util$rgb2HSL.s,
						    l = _util$rgb2HSL.l;

						this.model.h = h;
						this.model.s = s;
						this.model.l = l;
						break;
					case 'h':
					case 's':
					case 'l':
						var _util$HSL2rgb2 = _util2.default.HSL2rgb(this.model),
						    r = _util$HSL2rgb2.r,
						    g = _util$HSL2rgb2.g,
						    b = _util$HSL2rgb2.b;

						this.model.r = r;
						this.model.g = g;
						this.model.b = b;
						break;
				}
				this.render();
				_watcher2.default.trigger('input', this.model);
			}
		}, {
			key: 'get',
			value: function get(type) {
				type = type.toLowerCase();
				switch (type) {
					case 'rgb':
						return {
							r: this.model.r,
							g: this.model.g,
							b: this.model.b
						};break;
					case 'hsl':
						return {
							h: this.model.h,
							s: this.model.s,
							l: this.model.l
						};break;
					case 'hex':
						return _util2.default.rgb2Hex([this.model, r, this.model, g, this.model, b]);break;
					case 'default':
						throw Error('Invalid parameter!');
				}
			}
		}, {
			key: 'set',
			value: function set(type, data) {
				type = type.toLowerCase();
				if (type === 'rgb') {
					data = _util2.default.rgb2HSL(data);
					this.change(data);
					_watcher2.default.trigger('input', this.model);
				} else if (type === 'hsl') {
					this.change(data);
					_watcher2.default.trigger('input', this.model);
				} else {
					throw Error('Invalid parameter!');
				}
			}
		}]);
		return ColorValue;
	}();

	exports.default = ColorValue;

/***/ }
/******/ ]);