const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const adresService = require("../service/adres");
const validate = require("../core/validation");
const Role = require("../core/roles");
const { getLogger } = require("../core/logging");
const bedrijfService = require("../service/bedrijf");
const usersService = require("../service/users");

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

    getLogger().info("Addresses fetched successfully", { adres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };

    getLogger().error("Error occurred while fetching addresses", { error });
  }
};
getAdresByUser.validationScheme = {};

// const getAllAdressen = async (ctx) => {
//   try {
//     const adressen = await adresService.getAllAdressen();
//     ctx.body = adressen;
//     ctx.status = 200;
//     getLogger().info("All addresses fetched successfully");
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: "Internal Server Error" };
//     getLogger().error("Error occurred while fetching addresses", { error });
//   }
// };
// getAllAdressen.validationSheme = null;



const getAdresById = async (ctx) => {
  try {
    let bedrijf;
    let user;
    const { idKlant, idLeverancier } = ctx.state.session;
    const id = ctx.params.id;
    const adres = await adresService.getAdresById(id);

    if (!adres) {
      ctx.status = 404;
      ctx.body = { message: "Address not found" };
      return;
    }

    if (idKlant !== undefined) {
      bedrijf = await bedrijfService.getBedrijfByKlantId(idKlant);
      user = await usersService.getKlantById(idKlant);
    } else {
      bedrijf = await bedrijfService.getBedrijfByKlantId(idLeverancier);
      user = await usersService.getLeverancierById(idLeverancier);
    }

    if (!bedrijf || !user || adres.idAdres !== bedrijf.Adres.idAdres || user[0].klant.bedrijf.idBedrijf !== bedrijf.idBedrijf) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }
    ctx.body = adres;
    ctx.status = 200;
    getLogger().info(`Address with ID ${id} fetched successfully`);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    getLogger().error("Error occurred while fetching address by ID", { error });
  }
};

getAdresById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};



const createAdres = async (ctx) => {
  try {
    const { straat, nummer, stad, postcode, laatstGebruikt } = ctx.request.body;
    //const laatstGebruiktDate = new Date(laatstGebruikt);

    const newAdres = await adresService.createAdres({
      straat: String(straat),
      nummer: String(nummer),
      stad: String(stad),
      postcode: String(postcode),
      //laatstGebruikt: laatstGebruiktDate,
    });

    ctx.body = newAdres;
    ctx.status = 201;
    getLogger().info("New address created successfully", { newAdres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    getLogger().error("Error occurred while creating address", { error });
  }
};
createAdres.validationScheme = {
  body: {
    straat: Joi.string().required().invalid(" ", ""),
    nummer: Joi.string().required().invalid(" ", ""),
    stad: Joi.string().required().invalid(" ", ""),
    postcode: Joi.string().required().invalid(" ", ""),
    //laatstGebruikt: Joi.date().required(),
  },
};

// const updateAdresById = async (ctx) => {
//   try {
//     const { straat, nummer, stad, postcode, laatstGebruikt } = ctx.request.body;
//     const laatstGebruiktDate = new Date(laatstGebruikt);

//     const updatedAdres = await adresService.updateAdresById(
//       Number(ctx.params.id),
//       {
//         straat: String(straat),
//         nummer: String(nummer),
//         stad: String(stad),
//         postcode: String(postcode),
//         laatstGebruikt: laatstGebruiktDate,
//       }
//     );

//     ctx.body = updatedAdres;
//     ctx.status = 200;
//     getLogger().info(`Address with ID ${ctx.params.id} updated successfully`, {
//       updatedAdres,
//     });
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: "Internal Server Error" };
//     getLogger().error(
//       `Error occurred while updating address with ID ${ctx.params.id}`,
//       { error }
//     );
//   }
// };
// updateAdresById.validationSheme = {
//   params: {
//     id: Joi.number().integer().positive(),
//   },
//   body: {
//     straat: Joi.string().required().invalid(" ", ""),
//     nummer: Joi.string().required().invalid(" ", ""),
//     stad: Joi.string().required().invalid(" ", ""),
//     postcode: Joi.string().required().invalid(" ", ""),
//     laatstGebruikt: Joi.date().required(),
//   },
// };

// const deleteAdresById = async (ctx) => {
//   try {
//     await adresService.deleteAdresById(ctx.params.id);
//     ctx.status = 204;
//     getLogger().info(`Address with ID ${ctx.params.id} deleted successfully`);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: "Internal Server Error" };
//     getLogger().error(
//       `Error occurred while deleting address with ID ${ctx.params.id}`,
//       { error }
//     );
//   }
// };
// deleteAdresById.validationSheme = {
//   params: {
//     id: Joi.number().integer().positive(),
//   },
// };


/**
 * Install adres routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const adresRouter = new KoaRouter({
    prefix: "/adres",
  });

  adresRouter.get(
    "/user",
    requireAuthentication,
    validate(getAdresByUser.validationScheme),
    getAdresByUser
  );

  // // moet normaal alleen visible zijn voor admin
  // adresRouter.get(
  //   "/",
  //   requireAuthentication,
  //   requireAdmin,
  //   validate(getAllAdressen.validationSheme),
  //   getAllAdressen
  // );
  adresRouter.post(
    "/",
    requireAuthentication,
    // requireAdmin,
    validate(createAdres.validationScheme),
    createAdres
  );
  adresRouter.get(
    "/:id",
    requireAuthentication,
    // requireAdmin,
    validate(getAdresById.validationScheme),
    getAdresById
  );
  // adresRouter.put(
  //   "/:id",
  //   requireAuthentication,
  //   // requireAdmin,
  //   validate(updateAdresById.validationSheme),
  //   updateAdresById
  // );
  // adresRouter.delete(
  //   "/:id",
  //   requireAuthentication,
  //   requireAdmin,
  //   validate(deleteAdresById.validationSheme),
  //   deleteAdresById
  // );

  router.use(adresRouter.routes()).use(adresRouter.allowedMethods());
};
