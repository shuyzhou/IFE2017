function observerFactory(data) {
    return {
        data: new Observer(data),
        $watch: function (key,callback) {
            this.data.$watch(key,callback);
        }
    }
}
// 观察者构造函数
function Observer(data,superviser = null) {
    this.watcher = new Event();
    this.superviser = superviser;
    this.walk(data);
}

let p = Observer.prototype;

p.walk = function (obj) {
    for (let [key, val] of Object.entries(obj)) {
        // 这里进行判断，如果还没有遍历到最底层，继续new Observer
        if (typeof val === 'object') {
            val = new Observer(val,this.watcher);
        }
        this.convert(key, val); 
    }
};
//为某个属性绑定getter和setter
p.convert = function (key, val) {
    const self = this;
    Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            val.$parent = val.$parent || key;
            return val;
        },
        set: function (newVal) {
            if (newVal === val) return;
            if (typeof newVal === 'object') {
                val = new Observer(newVal,this.watcher);
            }
            val = newVal;
            this.watcher.trigger(key,newVal);
            this.superviser.trigger(this.$parent,newVal);
        }
    })
};
p.$watch = function (key,callback) {
    if(key in this){
        this.watcher.listen(key,callback);
    }
    else {
        for (let [prop, val] of Object.entries(this)) {
            if (val instanceof Object && !!val.$watch) {
                val.$watch(key,callback);
            }
        }
    }
}