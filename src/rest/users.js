const KoaRouter = require('@koa/router'); 
const validate = require('../core/validation');
const userService = require('../service/users');
const Joi = require('joi');

const login = async (ctx) => {
  const { email, password } = ctx.request.body; 
  const token = await userService.login(email, password); 
  ctx.body = token; 
};
login.validationScheme = { 
  body: {
    email: Joi.string().email(),
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
    prefix: '/users',
  });
  // public
  userRouter.post('/login', validate(login.validationScheme), login);

  router.use(userRouter.routes()).use(router.allowedMethods());
}