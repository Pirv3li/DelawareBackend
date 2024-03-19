const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const notificationService = require('../service/notificatie');
const validate = require('../core/validation')
const Role = require('../core/roles');
const { getLogger } = require('../core/logging');

const getAllNotifications = async (ctx) => {
  try {
    const begin = parseInt(ctx.query.begin) || 0;
    const einde = parseInt(ctx.query.einde) || 20;
    const {aantal} = ctx.request.body;
    const notifications = await notificationService.getAllNotifications(begin, einde, aantal);
    getLogger().info('Notifications retrieved successfully', { count: notifications.length });
    ctx.body = notifications;
  } catch (error) {
    getLogger().error('Error occurred while retrieving notifications', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getAllNotifications.validationSheme = {
  query: {
    begin: Joi.number().optional(),
    einde: Joi.number().optional(),
  },
  body: {
    aantal: Joi.number().positive(),
  }
}


const getNotificationById = async (ctx) => {
  try {
    const notification = await notificationService.getNotificationById(Number(ctx.params.id));
    getLogger().info(`Notification with ID ${ctx.params.id} retrieved successfully`);
    ctx.body = notification;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving notification with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getNotificationById.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const getNotificationByOrderId = async (ctx) => {
  try {
    const notification = await notificationService.getNotificationByOrderId(Number(ctx.params.id));
    getLogger().info(`Notification with Order ID ${ctx.params.id} retrieved successfully`);
    ctx.body = notification;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving notification with Order ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getNotificationByOrderId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createNotification = async (ctx) => {
  try {
    const { idOrder, text, onderwerp, geopend, afgehandeld, datum } = ctx.request.body;
    const newNotification = await notificationService.createNotification({ idOrder, text, onderwerp, geopend, afgehandeld, datum });
    getLogger().info('New notification created successfully', { newNotification });
    ctx.body = newNotification;
    ctx.status = 201;
  } catch (error) {
    getLogger().error('Error occurred while creating new notification', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
createNotification.validationSheme = {
  body: {
    idOrder: Joi.string().required(),
    text: Joi.string().required(),
    onderwerp: Joi.string().required(),
    geopend: Joi.boolean().required(),
    afgehandeld: Joi.boolean().required(),
    datum: Joi.date().optional()
  }
}

const updateNotificationById = async (ctx) => {
  try {
    const { idOrder, text, onderwerp, geopend, afgehandeld, datum } = ctx.request.body;
    const updatedNotification = await notificationService.updateNotificationById(ctx.params.id, {
      idOrder, text, onderwerp, geopend, afgehandeld, datum
    });
    getLogger().info(`Notification with ID ${ctx.params.id} updated successfully`, { updatedNotification });
    ctx.body = updatedNotification;
    ctx.status = 200;
  } catch (error) {
    getLogger().error(`Error occurred while updating notification with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
updateNotificationById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    idOrder: Joi.string(),
    text: Joi.string(),
    onderwerp: Joi.string(),
    geopend: Joi.boolean(),
    afgehandeld: Joi.boolean(),
    datum: Joi.date()
  }
};

const deleteNotificationById = async (ctx) => {
  try {
    await notificationService.deleteNotificationById(ctx.params.id);
    getLogger().info(`Notification with ID ${ctx.params.id} deleted successfully`);
    ctx.status = 204;
  } catch (error) {
    getLogger().error(`Error occurred while deleting notification with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
deleteNotificationById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
}


const getAllNotificationsByKlantId = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const { begin } = ctx.request.body;
  const {aantal} = ctx.request.body;
  try {
    const notificatieKlant = await notificationService.getAllNotificationsByKlantId(idKlant, begin, aantal);
    getLogger().info(`Notifications for Klant with ID ${idKlant} retrieved successfully`);
    ctx.status = 200;
    ctx.body = notificatieKlant;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving notifications for Klant with ID ${idKlant}`, { error });
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || 'Internal Server Error' };
  }
};
getAllNotificationsByKlantId.validationSheme = {
  body: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive(),
  }
}

const getAllNotificationsByLeverancierId = async (ctx) => {
  const idLeverancier = ctx.state.session.idLeverancier;
  const { begin } = ctx.request.body;
  const {aantal} = ctx.request.body;
  try {
    const notifications = await notificationService.getAllNotificationsByLeverancierId(idLeverancier, begin, aantal);
    getLogger().info(`Notifications for Leverancier with ID ${idLeverancier} retrieved successfully`);
    ctx.status = 200;
    ctx.body = notifications;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving notifications for Leverancier with ID ${idLeverancier}`, { error });
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || 'Internal Server Error' };
  }
};

getAllNotificationsByLeverancierId.validationSheme = {
  body: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive(),
  }
}

const countUnopenedNotificationsByKlantId = async (ctx) => {
  try {
    const unopenedCount = await notificationService.countUnopenedNotificationsByKlantId(ctx.params.id);
    getLogger().info(`Unopened notification count for Klant with ID ${ctx.params.id} retrieved successfully`);
    ctx.status = 200;
    ctx.body = unopenedCount;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving unopened notification count for Klant with ID ${ctx.params.id}`, { error });
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || 'Internal Server Error' };
  }
};
countUnopenedNotificationsByKlantId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}


const countUnopenedNotificationsByLeverancierId = async (ctx) => {
  try {
    const unopenedCount = await notificationService.countUnopenedNotificationsByLeverancierId(ctx.params.id);
    getLogger().info(`Unopened notification count for Leverancier with ID ${ctx.params.id} retrieved successfully`);
    ctx.status = 200;
    ctx.body = unopenedCount;
  } catch (error) {
    getLogger().error(`Error occurred while retrieving unopened notification count for Leverancier with ID ${ctx.params.id}`, { error });
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || 'Internal Server Error' };
  }
};
countUnopenedNotificationsByLeverancierId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

//sok my kheb da gefixt
const checkKlantId = (ctx, next) => {
  const { idKlant, roles } = ctx.state.session;
  const { id } = ctx.params;

  if (Number(id) !== idKlant && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'U hebt geen toestemming om deze gebruiker te bekijken',
      {
        code: 'FORBIDDEN',
      }
    );
  }
  return next();
};

const checkLeverancierId = (ctx, next) => {
  const { idLeverancier, roles } = ctx.state.session;
  const { id } = ctx.params;

  if (Number(id) !== idLeverancier && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'U hebt geen toestemming om deze gebruiker te bekijken',
      {
        code: 'FORBIDDEN',
      }
    );
  }
  return next();
};


const checkId = async (ctx, next) => {
  const { idLeverancier, idKlant, roles } = ctx.state.session;
  const { id } = ctx.params;

  const notification = await notificationService.getNotificationById(Number(id));

  if ((notification.idLeverancier !== idLeverancier && notification.idKlant !== idKlant) && !roles.includes(Role.ADMIN)) {
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



const requireKlant = makeRequireRole(Role.KLANT);
const requireLeverancier = makeRequireRole(Role.LEVER);
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
  notificationRouter.post(
    "/klant",
    requireAuthentication,
    requireKlant,
    validate(getAllNotificationsByKlantId.validationSheme),
    getAllNotificationsByKlantId
  );
  notificationRouter.post(
    "/leverancier",
    requireAuthentication,
    requireLeverancier,
    validate(getAllNotificationsByLeverancierId.validationSheme),
    getAllNotificationsByLeverancierId
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
    '/ongeopend/klant/:id',
    requireAuthentication,
    validate(countUnopenedNotificationsByKlantId.validationSheme),
    checkKlantId,
    countUnopenedNotificationsByKlantId,
  );

  notificationRouter.get(
    '/ongeopend/leverancier/:id',
    requireAuthentication,
    validate(countUnopenedNotificationsByLeverancierId.validationSheme),
    checkLeverancierId,
    countUnopenedNotificationsByLeverancierId,
  );



  router.use(notificationRouter.routes()).use(notificationRouter.allowedMethods());
};