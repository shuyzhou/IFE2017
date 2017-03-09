function observerFactory(data) {
    return {
        data: new Observer(data),
        $watch: function (key,callback) {
            this.data.$watch(key,callback);
        }
    }
}
// 观察者构造函数
function Observer(data,supervisor = null) {
    this.watcher = new Event();
    this.supervisor = supervisor;
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
            this.supervisor.trigger(this.$parent,newVal);
        }
    })
};
p.$watch = function (key,callback) {
    let keyList = key.split('.');
    let observer;
    let prop;
    keyList.reduce((obj,key) => {
        if (obj.hasOwnProperty(key)) {
                observer = obj;
                prop = key;
                return obj[key];
        } else {
            throw Error('The property does not exist!');
        }
    }, this);
    observer.watcher.listen(prop,callback);
}