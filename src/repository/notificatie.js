const { getKnex, tables } = require('../data');

const getAllNotifications = async () => {
  return getKnex()(tables.notificatie)
    .select('*');
};

const getNotificationById = async (idNotificatie) => {
  const notification = await getKnex()(tables.notificatie)
    .where('idNotificatie', idNotificatie)
    .first();

  return notification;
};

const createNotification = async ({ idOrder, text, onderwerp, geopend, afgehandeld }) => {
  const [id] = await getKnex()(tables.notificatie).insert({
    idOrder,
    text,
    onderwerp,
    geopend,
    afgehandeld,
  });
  return id;
};

const updateNotificationById = async (idNotificatie, { idOrder, text, onderwerp, geopend, afgehandeld }) => {
  await getKnex()(tables.notificatie)
    .where('idNotificatie', idNotificatie)
    .update({
      idOrder,
      text,
      onderwerp,
      geopend,
      afgehandeld,
    });
  return idNotificatie;
};

const deleteNotificationById = async (idNotificatie) => {
  await getKnex()(tables.notificatie)
    .where('idNotificatie', idNotificatie)
    .del();
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
};