const notificationRepository = require('../repository/notificatie');

const getAllNotifications = async (ctx) => {
  const begin = parseInt(ctx.query.begin) || 0;
  const einde = parseInt(ctx.query.einde) || 20;
  const items = await notificationService.getAllNotifications(begin, einde);
  ctx.body = {
    items,
    count: items.length,
  };
};


const getAllNotificationsByKlantId = async (idKlant, begin) => {

  return notificationRepository.getAllNotificationsByKlantId(idKlant, begin);

};

const getAllNotificationsByLeverancierId = async (idLeverancier,begin) => {

  return notificationRepository.getAllNotificationsByLeverancierId(idLeverancier, begin);

};

const getNotificationById = async (idNotificatie) => {
  const notification = await notificationRepository.getNotificationById(idNotificatie);
  if (!notification) {
    throw ServiceError.notFound(`There is no notification with id ${idNotificatie}.`, { idNotificatie });
  }
  return notification
};

const createNotification = async ({ idOrder, text, onderwerp, geopend, afgehandeld }) => {
  const idNewNotification = await notificationRepository.createNotification({
    idOrder,
    text,
    onderwerp,
    geopend,
    afgehandeld,
  });

  return notificationRepository.getNotificationById(idNewNotification);
};

const updateNotificationById = async (id, { idOrder, text, onderwerp, geopend, afgehandeld,datum }) => {
  const idUpdatedNotificatie = await notificationRepository.updateNotificationById(id, {
    idOrder,
    text,
    onderwerp,
    geopend,
    afgehandeld,
    datum,
  });
  return notificationRepository.getNotificationById(idUpdatedNotificatie);
};

const deleteNotificationById = async (id) => {
  await notificationRepository.deleteNotificationById(id);
};


updateNotificationById

const countUnopenedNotificationsByKlantId = async (idKlant) => {

  return notificationRepository.countUnopenedNotificationsByKlantId(idKlant);

};

const countUnopenedNotificationsByLeverancierId = async (idLeverancier) => {

  return notificationRepository.countUnopenedNotificationsByLeverancierId(idLeverancier);

};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
  getAllNotificationsByKlantId,
  getAllNotificationsByLeverancierId,
  countUnopenedNotificationsByKlantId,
  countUnopenedNotificationsByLeverancierId,
};