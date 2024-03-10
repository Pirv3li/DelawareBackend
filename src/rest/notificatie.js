const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication, makeRequireRole } = require('../core/auth'); 
const notificationService = require('../service/notificatie');
const validate = require('../core/validation')
const Role = require('../core/roles');

const getAllNotifications = async (ctx) => {
  const begin = parseInt(ctx.query.begin) || 0;
  const einde = parseInt(ctx.query.einde) || 20;
  ctx.body = await notificationService.getAllNotifications(begin, einde);
};
getAllNotifications.validationSheme = null


const getNotificationById = async (ctx) => {
  
  ctx.body = await notificationService.getNotificationById(Number(ctx.params.id));
};
getNotificationById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const getNotificationByOrderId = async (ctx) => {
  ctx.body = await notificationService.getNotificationByOrderId(Number(ctx.params.id));
};
getNotificationByOrderId.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createNotification = async (ctx) => {
  const {idOrder, text, onderwerp, geopend, afgehandeld} = ctx.request.body;
  const newNotification = await notificationService.createNotification({
    idOrder: Number(idOrder),
    text: String(text),
    onderwerp: String(onderwerp),
    geopend: Boolean(geopend),
    afgehandeld: Boolean(afgehandeld)
  });
  ctx.body = newNotification;
  ctx.status = 201;
};


createNotification.validationSheme={
    body: {
        idOrder: Joi.number().integer().positive().required(),
        text: Joi.string().required(),
        onderwerp: Joi.string().required(),
        geopend: Joi.boolean().required(),
        afgehandeld: Joi.boolean().required()
    }
}

const updateNotificationById = async (ctx) => {
  const {idOrder, text, onderwerp, geopend, afgehandeld, datum} = ctx.request.body;
  ctx.body = await notificationService.updateNotificationById(Number(ctx.params.id), {
    idOrder: Number(idOrder),
    text: String(text),
    onderwerp: String(onderwerp),
    geopend: Boolean(geopend),
    afgehandeld: Boolean(afgehandeld),
    datum: new Date(datum),
  });
  ctx.status = 200;
};
updateNotificationById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    idOrder: Joi.number().integer().positive(),
    text: Joi.string(),
    onderwerp: Joi.string(),
    geopend: Joi.boolean(),
    afgehandeld: Joi.boolean(),
    datum: Joi.date()
  }
};

const deleteNotificationById = async (ctx) => {
  notificationService.deleteNotificationById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteNotificationById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}


const getAllNotificationsByKlantId = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const begin = parseInt(ctx.params.id);
  ctx.body = await notificationService.getAllNotificationsByKlantId(idKlant, begin);
};

getAllNotificationsByKlantId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
  }
}

const getAllNotificationsByLeverancierId = async (ctx) => {
  const idLeverancier = ctx.state.session.idLeverancier;
  const  begin = parseInt(ctx.params.id);
  ctx.body = await notificationService.getAllNotificationsByLeverancierId(idLeverancier, begin);
};

getAllNotificationsByLeverancierId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
  }
}

countUnopenedNotificationsByKlantId = async (ctx) => {
  ctx.body = await notificationService.countUnopenedNotificationsByKlantId(Number(ctx.params.id));
};
countUnopenedNotificationsByKlantId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}


countUnopenedNotificationsByLeverancierId = async (ctx) => {
  ctx.body = await notificationService.countUnopenedNotificationsByLeverancierId(Number(ctx.params.id));
};
countUnopenedNotificationsByLeverancierId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

// const checkKlantId = (ctx, next) => {
//   const { idKlant, roles } = ctx.state.session;
//   const { id } = ctx.params;

//   const notifications =  notificationRepository.getAllNotificationsByKlantId(idKlant);
//   if (notifications.length > 0) {
//     idKlantNot =  notifications[0].idKlant;
//   } else {
//     throw new Error('No notifications found for this klant id');
//   }

//   console.log(idKlantNot);
//   if (Number(id) !== idKlant && !roles.includes(Role.ADMIN)) {
//     return ctx.throw(
//       403,
//       'U hebt geen toestemming om deze gebruiker te bekijken',
//       {
//         code: 'FORBIDDEN',
//       }
//     );
//   }
//   return next();
// };

// const checkLeverancierId = (ctx, next) => {
//   const { idLeverancier, roles } = ctx.state.session;
//   const { id } = ctx.params;

//   if (Number(id) !== idLeverancier && !roles.includes(Role.ADMIN)) {
//     return ctx.throw(
//       403,
//       'U hebt geen toestemming om deze gebruiker te bekijken',
//       {
//         code: 'FORBIDDEN',
//       }
//     );
//   }
//   return next();
// };


const checkId = async (ctx, next) => {
  const { idLeverancier, idKlant, roles } = ctx.state.session;
  const { id } = ctx.params;

  const notification = await notificationService.getNotificationById(Number(id));

  if ((notification.idLeverancier !== idLeverancier && notification.idKlant !== idKlant ) && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      `U hebt geen toestemming om deze notificatie te bekijken`,
      {
        code: 'FORBIDDEN',
      }
    );
  }
  return next();
};



requireKlant = makeRequireRole(Role.KLANT)

/**
 * Install notification routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const notificationRouter = new KoaRouter({
    prefix: '/notificatie',
  });

  notificationRouter.get(
    '/',
    requireAuthentication,
    validate(getAllNotifications.validationSheme),
    getAllNotifications
  );
  notificationRouter.post(
    '/',
    requireAuthentication,
    validate(createNotification.validationSheme),
    createNotification
  );
  notificationRouter.get(
    '/:id',
    requireAuthentication,
    validate(getNotificationById.validationSheme),
    checkId,
    getNotificationById
  );
  notificationRouter.put(
    '/:id',
    requireAuthentication,
    validate(updateNotificationById.validationSheme),
    updateNotificationById
  );
  notificationRouter.delete(
    '/:id',
    requireAuthentication,
    validate(deleteNotificationById.validationSheme),
    deleteNotificationById
  );

  notificationRouter.get(
    '/klant/:id',
    requireAuthentication,
    validate(getAllNotificationsByKlantId.validationSheme),
    // checkKlantId,
    getAllNotificationsByKlantId
  );

  notificationRouter.get(
    '/leverancier/:id',
    requireAuthentication,
    validate(getAllNotificationsByLeverancierId.validationSheme),
    // checkLeverancierId,
    getAllNotificationsByLeverancierId,
  );

  notificationRouter.get(
    '/ongeopend/klant/:id',
    requireAuthentication,
    validate(countUnopenedNotificationsByKlantId.validationSheme),
    // checkKlantId,
    countUnopenedNotificationsByKlantId,
  );

  notificationRouter.get(
    '/ongeopend/leverancier/:id',
    requireAuthentication,
    validate(countUnopenedNotificationsByLeverancierId.validationSheme),
    // checkLeverancierId,
    countUnopenedNotificationsByLeverancierId,
  );

 

  router.use(notificationRouter.routes()).use(notificationRouter.allowedMethods());
};