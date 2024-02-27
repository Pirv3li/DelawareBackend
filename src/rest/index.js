const Router = require('@koa/router');
const installKlantRouter = require('./klant');
const installLeverancierRouter = require('./leverancier');
const installProductRouter = require('./product');
/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installKlantRouter(router);
  installLeverancierRouter(router);
  installProductRouter(router);

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
  });

  app.use(router.routes())
     .use(router.allowedMethods());
};
