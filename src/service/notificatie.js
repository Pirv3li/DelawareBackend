const notificationRepository = require('../repository/notificatie');

const getAllNotifications = async () => {
  const items = await notificationRepository.getAllNotifications();
  return {
    items,
    count: items.length,
  };
};


const getAllNotificationsByKlantId = async (idKlant) => {

  return notificationRepository.getAllNotificationsByKlantId(idKlant);

};

const getAllNotificationsByLeverancierId = async (idLeverancier) => {

  return notificationRepository.getAllNotificationsByLeverancierId(idLeverancier);

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