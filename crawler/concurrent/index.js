const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const router = require('./routes');
const app = new Koa();
const server = require('http').createServer(app.callback());
const socket = require('./socket')(server);

app 
    .use(serve(path.join(__dirname, '/public')))
    .use(views(path.join(__dirname, '/views')))
    .use(router.routes());
server.listen(8080);