const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication, makeRequireRole } = require('../core/auth'); 
const adresService = require('../service/adres');
const validate = require('../core/validation')
const Role = require('../core/roles')

const getAdresByUser = async (ctx) => {
  try{
  let adres;
  const { idKlant, idLeverancier } = ctx.state.session;
  if(idKlant!=undefined){
   adres = await adresService.getAdresByKlantId(idKlant);
   ctx.body = adres;
   ctx.status = 200;
  }
  else{
    adres = await adresService.getAdresByLeverancierId(idLeverancier);
    ctx.body = adres;
    ctx.status = 200;
  }
}catch(error){
  ctx.status = 500;
}
};
getAdresByUser.validationSheme = null

const getAllAdressen = async (ctx) => {
  ctx.body = await adresService.getAllAdressen();
};

getAllAdressen.validationSheme = null;

const getAdresById = async (ctx) => {
  ctx.body = await adresService.getAdresById(Number(ctx.params.id));
};
getAdresById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createAdres = async (ctx) => {
  const {straat, nummer, stad, postcode, laatstGebruikt} = ctx.request.body;
  const newAdres = await adresService.createAdres({
    straat: String(straat),
    nummer: String(nummer),
    stad: String(stad),
    postcode: String(postcode),
    laatstGebruikt: new Date(laatstGebruikt)
  });
  ctx.body = newAdres;
  ctx.status = 201;
};
createAdres.validationSheme={
    body: {
        straat: Joi.string().required().invalid(' ', ''),
        nummer: Joi.string().required().invalid(' ', ''),
        stad: Joi.string().required().invalid(' ', ''),
        postcode: Joi.string().required().invalid(' ', ''),
        laatstGebruikt: Joi.date().required()
    }
}

const updateAdresById = async (ctx) => {
  const {straat, nummer, stad, postcode, laatstGebruikt} = ctx.request.body;
  const updatedAdres = await adresService.updateAdresById(Number(ctx.params.id), {
    straat: String(straat),
    nummer: String(nummer),
    stad: String(stad),
    postcode: String(postcode),
    laatstGebruikt: new Date(laatstGebruikt)
  });
  ctx.body = updatedAdres;
  ctx.status = 200;
};
updateAdresById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    straat: Joi.string().required().invalid(' ', ''),
    nummer: Joi.string().required().invalid(' ', ''),
    stad: Joi.string().required().invalid(' ', ''),
    postcode: Joi.string().required().invalid(' ', ''),
    laatstGebruikt: Joi.date().required()
  }
}

const deleteAdresById = async (ctx) => {
  adresService.deleteAdresById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteAdresById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
};

const requireAdmin = makeRequireRole(Role.ADMIN);

/**
 * Install adres routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const adresRouter = new KoaRouter({
    prefix: '/adres',
  });

  adresRouter.get(
    '/user',
    requireAuthentication,
    validate(getAdresByUser.validationSheme),
    getAdresByUser
  );

  adresRouter.get(
    '/',
    requireAuthentication,
    requireAdmin,
    validate(getAllAdressen.validationSheme),
    getAllAdressen
  );
  adresRouter.post(
    '/',
    requireAuthentication,
    requireAdmin,
    validate(createAdres.validationSheme),
    createAdres
  );
  adresRouter.get(
    '/:id',
    requireAuthentication,
    requireAdmin,
    validate(getAdresById.validationSheme),
    getAdresById
  );
  adresRouter.put(
    '/:id',
    requireAuthentication,
    requireAdmin,
    validate(updateAdresById.validationSheme),
    updateAdresById
  );
  adresRouter.delete(
    '/:id',
    requireAuthentication,
    requireAdmin,
    validate(deleteAdresById.validationSheme),
    deleteAdresById
  );

  router.use(adresRouter.routes()).use(adresRouter.allowedMethods());
};