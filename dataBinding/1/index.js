// 观察者构造函数
function Observer(data) {
    this.data = data;
    this.walk(data)
}

let p = Observer.prototype;

p.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};
//为某个属性绑定getter和setter
p.convert = function (key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val
        },
        set: function (newVal) {
            console.log('你设置了' + key + '，' + '新的值为' + newVal);
            if (newVal === val) return;
            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
            val = newVal
        }
    })
};