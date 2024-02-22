const KoaRouter = require('@koa/router'); 
const validate = require('../core/validation');
const userService = require('../service/users');
const Joi = require('joi');

const login = async (ctx) => {
  const { username, password } = ctx.request.body; 
  const token = await userService.login(username, password); 
  ctx.body = token; 
};
login.validationScheme = { 
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: '/leverancier',
  });
  // public
  userRouter.post('/login', validate(login.validationScheme), login);

  router.use(userRouter.routes()).use(router.allowedMethods());
}