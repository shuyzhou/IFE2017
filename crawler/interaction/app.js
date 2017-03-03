const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const exec = require('./lib/exec-promise');
const request = require('request');
const fs = require('fs');
const views = require('co-views');
const dataDAO = require("./crawler/model/data");
const app = new Koa();

// setup views, appending .ejs

const render = views(path.join(__dirname, '/views'), { ext: 'swig' });
// custom 404

/*app.use(async function (next) {
  await next;
//  if (this.body || !this.idempotent) return;
  this.redirect('/404.html');
});*/
// serve static files from ./public
app.use(serve(path.join(__dirname, '/public')));
//spawn the crawler
app.use(async function (ctx,next) {
	if('/crawler' !== ctx.path)return;
	const word = ctx.query.keyword;
  const device = ctx.query.userAgent||'';
  const cmd = `phantomjs ./crawler/task.js ${word} ${device}`
  let result;
  //status defaults to 404 
  ctx.status = 200;
  ctx.set('Content-Type', 'text/html');
  if(!!word){
      app.context.result = result = await exec(cmd);
      await next();
      await dataDAO.save(result);
	    ctx.body = await render('result', result);
  }
  else {
      ctx.body = "The crawler need word and divice name!";      
  }
});

app.use(function (ctx) {
  let dataList = ctx.result.dataList;
  dataList.forEach((data) => {
      if (!!data.pic) {
        const picId = uid();
        const fileName = `public/images/${picId}.jpg`;
        request(data.pic).pipe(fs.createWriteStream(fileName));
        data.picId = `images/${picId}.jpg`;
      }
  });
});

app.listen(8080);
console.log("server start");
//get pic unique id
function uid() {
  return Math.random().toString(36).slice(2);
}
