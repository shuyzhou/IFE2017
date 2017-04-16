const Router = require('koa-router');
const router = new Router();
module.exports = router;
router.get('/*', async function(ctx) {
    ctx.redirect('/404.html');
});