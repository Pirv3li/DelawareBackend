const notificationRepository = require('../repository/notificatie');

const getAllNotifications = async () => {
  const items = await notificationRepository.getAllNotifications();
  return {
    items,
    count: items.length,
  };
};

const getNotificationById = async (id) => {
  const notification = await notificationRepository.getNotificationById(id);
  if (!notification) {
    throw ServiceError.notFound(`There is no notification with id ${id}.`, { id });
  }
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

const updateNotificationById = async (id, { idOrder, text, onderwerp, geopend, afgehandeld }) => {
  const idUpdatedNotificatie = await notificationRepository.updateNotificationById(id, {
    idOrder,
    text,
    onderwerp,
    geopend,
    afgehandeld,
  });
  return notificationRepository.getNotificationById(idUpdatedNotificatie);
};

const deleteNotificationById = async (id) => {
  await notificationRepository.deleteNotificationById(id);
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
};