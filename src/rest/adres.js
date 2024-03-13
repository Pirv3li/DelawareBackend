const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication, makeRequireRole } = require('../core/auth'); 
const adresService = require('../service/adres');
const validate = require('../core/validation')
const Role = require('../core/roles');
const { getLogger } = require('../core/logging'); 

const getAdresByUser = async (ctx) => {
  try {
    let adres;
    const { idKlant, idLeverancier } = ctx.state.session;
    if (idKlant !== undefined) {
      adres = await adresService.getAdresByKlantId(idKlant);
    } else {
      adres = await adresService.getAdresByLeverancierId(idLeverancier);
    }

    ctx.body = adres;
    ctx.status = 200;

    getLogger().info('Addresses fetched successfully', { adres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };

    getLogger().error('Error occurred while fetching addresses', { error });
  }
};
getAdresByUser.validationSheme = null

const getAllAdressen = async (ctx) => {
  try {
    const adressen = await adresService.getAllAdressen();
    ctx.body = adressen;
    ctx.status = 200;
    getLogger().info('All addresses fetched successfully');
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    getLogger().error('Error occurred while fetching addresses', { error });
  }
};
getAllAdressen.validationSheme = null;

const getAdresById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const adres = await adresService.getAdresById(id);
    ctx.body = adres;
    ctx.status = 200;
    getLogger().info(`Address with ID ${id} fetched successfully`);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    getLogger().error('Error occurred while fetching address by ID', { error });
  }
};
getAdresById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createAdres = async (ctx) => {
  try {
    const { straat, nummer, stad, postcode, laatstGebruikt } = ctx.request.body;
    const laatstGebruiktDate = new Date(laatstGebruikt);

    const newAdres = await adresService.createAdres({
      straat: String(straat),
      nummer: String(nummer),
      stad: String(stad),
      postcode: String(postcode),
      laatstGebruikt: laatstGebruiktDate
    });

    ctx.body = newAdres;
    ctx.status = 201;
    getLogger().info('New address created successfully', { newAdres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    getLogger().error('Error occurred while creating address', { error });
  }
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
  try {
    const { straat, nummer, stad, postcode, laatstGebruikt } = ctx.request.body;
    const laatstGebruiktDate = new Date(laatstGebruikt);

    const updatedAdres = await adresService.updateAdresById(Number(ctx.params.id), {
      straat: String(straat),
      nummer: String(nummer),
      stad: String(stad),
      postcode: String(postcode),
      laatstGebruikt: laatstGebruiktDate
    });

    ctx.body = updatedAdres;
    ctx.status = 200;
    getLogger().info(`Address with ID ${ctx.params.id} updated successfully`, { updatedAdres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    getLogger().error(`Error occurred while updating address with ID ${ctx.params.id}`, { error });
  }
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
  try {
    await adresService.deleteAdresById(ctx.params.id);
    ctx.status = 204;
    getLogger().info(`Address with ID ${ctx.params.id} deleted successfully`);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    getLogger().error(`Error occurred while deleting address with ID ${ctx.params.id}`, { error });
  }
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

  // moet normaal alleen visible zijn voor admin 
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
    // requireAdmin,
    validate(createAdres.validationSheme),
    createAdres
  );
  adresRouter.get(
    '/:id',
    requireAuthentication,
    // requireAdmin,
    validate(getAdresById.validationSheme),
    getAdresById
  );
  adresRouter.put(
    '/:id',
    requireAuthentication,
    // requireAdmin,
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