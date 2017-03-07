const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const router = require('./routes');
const crawler = require('./crawler/task.js');
const dataDAO = require("./crawler/model/data");
const app = new Koa();
// serve static files from ./public
app .use(serve(path.join(__dirname, '/public')))
	.use(views(path.join(__dirname, '/views')))
	.use(router.routes());
app.listen(8080);
console.log("server start");