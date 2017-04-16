var socket = io.connect('http://localhost:8080');
var keyword = document.querySelector('#keyword');
var page = document.querySelector('#page');
var comfirm = document.querySelector('#crawler>button');
var result = document.querySelector('#result');
var progress = document.querySelector('#progress');
var total = 0;
var fullfilled = 0;
comfirm.addEventListener('click',
function(e) {
    var word = keyword.value;
    var p = page.value;
    if (!word) {
        alert("请填写关键词");
        return false;
    }
    if (!p || /\D/.test(p)) {
        alert("请填写页码");
        return false;
    }
    var checkedBox = [...document.querySelectorAll('input[name=device]:checked')];
    var deviceList = checkedBox.map(function(item) {
        total++;
        progress.innerHTML = "任务进度" + fullfilled + '/' + total;
        return item.value;
    });
    socket.emit('crawler', {
        word: word,
        page: p,
        deviceList: deviceList
    });
});
socket.on('result',
function(data) {
    var container = document.createElement('div');
    fullfilled++;
    progress.innerHTML = "任务进度" + fullfilled + '/' + total;
    container.innerHTML = tmpl('result_tmpl', data);
    result.appendChild(container);
});