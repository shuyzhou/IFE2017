import util from '../lib/util.js';
import watcher from './watcher.js';
export default class ColorValue {
        constructor(el, color) {
            this.el = document.querySelector(el);
            this.els = {};
            this.els.r = this.el.querySelector('#r');
            this.els.g = this.el.querySelector('#g');
            this.els.b = this.el.querySelector('#b');
            this.els.h = this.el.querySelector('#h');
            this.els.s = this.el.querySelector('#s');
            this.els.l = this.el.querySelector('#l');
            this.model = {};
            this.init();
            this.pick(color);
        }
        init() {
            this.el.addEventListener('keypress', this.dealInput.bind(this));
            this.el.addEventListener('click', this.dealClick.bind(this));
        }
        pick(color) {
            var {r, g, b} = color;
            var {h, s, l} = util.rgb2HSL(color);
            this.model.r = r;
            this.model.g = g;
            this.model.b = b;
            this.model.h = h;
            this.model.s = s;
            this.model.l = l;
            this.render();
        }
        render() {
            var {r, g, b, h, s, l} = this.model;
            this.els.r.value = r;
            this.els.g.value = g;
            this.els.b.value = b;
            this.els.h.value = h.toFixed(2).replace(/\.?0*$/g, '');
            this.els.s.value = s.toFixed(2).replace(/\.?0*$/g, '');
            this.els.l.value = l.toFixed(2).replace(/\.?0*$/g, '');
        }
        dealInput(e) {
            if (e.keyCode !== 13) {
                return;
            }
            var target = e.target;
            var input = target.value;
            if (!util.isValidInput(input)) {
                alert('请输入合法数字');
                return;
            }
            this.set(parseFloat(input), target.id)
        }
        dealClick(e) {
            var target = e.target;
            if (target.tagName.toLowerCase() === 'button') {
                var type = target.getAttribute("data-for");
                var oldValue = parseFloat(this.els[type].value);
                var operation = target.className;
                var method = {
                    plus: function(value, accuracy) {
                        return value + accuracy;
                    },
                    minus: function(value, accuracy) {
                        return value - accuracy;
                    }
                };
                var value;
                switch (type) {
                case 'r':
                case 'g':
                case 'b':
                    value = method[operation](oldValue, 1);
                    break;
                case 'h':
                case 's':
                case 'l':
                    value = method[operation](oldValue, 0.01);
                    break;
                }
                this.set(value, type);
            }
        }
        hueChange(hue) {
            hue = hue / 360;
            this.set(hue, 'h');
            this.set(1, 's');
            this.set(0.5, 'l');
        }
        get(type) {
            type = type.toLowerCase();
            switch (type) {
            case 'rgb':
                return {
                    r:
                    this.model.r,
                    g: this.model.g,
                    b: this.model.b
                };
                break;
            case 'hsl':
                return {
                    h:
                    this.model.h,
                    s: this.model.s,
                    l: this.model.l
                };
                break;
            case 'hex':
                return util.rgb2Hex([this.model, r, this.model, g, this.model, b]);
                break;
            case 'default':
                throw Error('Invalid parameter!');
            }
        }
        set(data, type) {
            type = type.toLowerCase();
            data = util.fixSet(data, type);
            this.model[type] = data;
            switch (type) {
            case 'r':
            case 'g':
            case 'b':
                var {
                    h, s, l
                } = util.rgb2HSL(this.model);
                this.model.h = h;
                this.model.s = s;
                this.model.l = l;
                break;
            case 'h':
            case 's':
            case 'l':
                var {
                    r, g, b
                } = util.HSL2rgb(this.model);
                this.model.r = r;
                this.model.g = g;
                this.model.b = b;
                break;
            }
            this.render();
            watcher.trigger('input', this.model);
        }
    }