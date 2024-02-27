const KoaRouter = require('@koa/router'); 
const validate = require('../core/validation');
const userService = require('../service/users');
const userRepository = require('../repository/users');
const Joi = require('joi');

const login = async (ctx) => {
  const { username, password } = ctx.request.body; 
  const token = await userService.loginKlant(username, password); 
  ctx.body = token; 
};
login.validationScheme = { 
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const getKlant = async (ctx) => {
  try {
    const { idKlant } = ctx.state.session;
    const klant = await userRepository.getKlantById(idKlant);

    if (klant) {
      ctx.status = 200;
      ctx.body = klant;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Klant not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error fetching klant data' };
  }
};
getKlant.validationScheme = {
  params: {
    idKlant: Joi.number().integer().required(),
  }
};

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: '/klant',
  });
  // public
  userRouter.post('/login', validate(login.validationScheme), login);
  userRouter.get('/', validate(getKlant.validationScheme), getKlant);

  router.use(userRouter.routes()).use(router.allowedMethods());
}