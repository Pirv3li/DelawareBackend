const KoaRouter = require('@koa/router'); 
const validate = require('../core/validation');
const userService = require('../service/users');
const userRepository = require('../repository/users');
const Joi = require('joi');

const login = async (ctx) => {
  const { username, password } = ctx.request.body; 
  const token = await userService.loginLeverancier(username, password); 
  ctx.body = token; 
};
login.validationScheme = { 
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const getLeverancier = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const leverancier = await userRepository.getLeverancierById(idLeverancier);

    if (leverancier) {
      ctx.status = 200;
      ctx.body = leverancier;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'leverancier not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error fetching leverancier data' };
  }
};
getLeverancier.validationScheme = {
  params: {
    idLeverancier: Joi.number().integer().required(),
  }
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
  userRouter.get('/', validate(getLeverancier.validationScheme), getLeverancier);

  router.use(userRouter.routes()).use(router.allowedMethods());
}