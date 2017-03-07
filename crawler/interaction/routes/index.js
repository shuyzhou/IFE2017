const Router = require('koa-router');
const crawler = require('../crawler/task.js');
const dataDAO = require("../crawler/model/data");
const router = new Router();
module.exports = router;
router
  .get('/crawler', async function (ctx, next) {
    const {word,device = ''} = ctx.query;
  	let result = await crawler(word,device);
    await dataDAO.save(result);
	await ctx.render('result.swig', result);
  })
  .get('/*',async function (ctx) {
  	ctx.redirect('/404.html');
  });