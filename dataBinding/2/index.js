function observerFactory(data) {
    return {
        data: new Observer(data),
        $watch: function (key,callback) {
            this.data.$watch(key,callback);
        }
    }
}
// 观察者构造函数
function Observer(data) {
    this.walk(data);
    this.event = new Event();
}

let p = Observer.prototype;

p.walk = function (obj) {
    for (let [key, val] of Object.entries(obj)) {
        // 这里进行判断，如果还没有遍历到最底层，继续new Observer
        if (typeof val === 'object') {
            val = new Observer(val);
        }
        this.convert(key, val); 
    }
};
//为某个属性绑定getter和setter
p.convert = function (key, val) {
    Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val;
        },
        set: function (newVal) {
            console.log('你设置了' + key + '，' + '新的值为' + newVal);
            if (newVal === val) return;
            if (typeof newVal === 'object') {
                val = new Observer(newVal);
            }
            val = newVal;
            this.event.trigger(key,newVal);
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