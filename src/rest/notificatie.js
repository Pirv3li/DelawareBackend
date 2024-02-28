const KoaRouter = require("@koa/router");
const Joi = require('joi');

const notificationService = require('../service/notificatie');
const validate = require('../core/validation')

const getAllNotifications = async (ctx) => {
  ctx.body = await notificationService.getAllNotifications();
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
  const {idOrder, text, onderwerp, geopend, afgehandeld} = ctx.request.body;
  ctx.body = await notificationService.updateNotificationById(Number(ctx.params.id), {
    idOrder: Number(idOrder),
    text: String(text),
    onderwerp: String(onderwerp),
    geopend: Boolean(geopend),
    afgehandeld: Boolean(afgehandeld)
  });
  ctx.status = 200;
};
updateNotificationById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    idOrder: Joi.number().integer().positive().required(),
    text: Joi.string().required(),
    onderwerp: Joi.string().required(),
    geopend: Joi.boolean().required(),
    afgehandeld: Joi.boolean().required()
  }
}

const deleteNotificationById = async (ctx) => {
  notificationService.deleteNotificationById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteNotificationById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

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
    validate(getAllNotifications.validationSheme),
    getAllNotifications
  );
  notificationRouter.post(
    '/',
    validate(createNotification.validationSheme),
    createNotification
  );
  notificationRouter.get(
    '/:id',
    validate(getNotificationById.validationSheme),
    getNotificationById
  );
  notificationRouter.put(
    '/:id',
    validate(updateNotificationById.validationSheme),
    updateNotificationById
  );
  notificationRouter.delete(
    '/:id',
    validate(deleteNotificationById.validationSheme),
    deleteNotificationById
  );

  router.use(notificationRouter.routes()).use(notificationRouter.allowedMethods());
};