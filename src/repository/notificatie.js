const { getKnex, tables } = require('../data');

const getAllNotifications = async () => {
  return getKnex()(tables.notificatie)
    .select('*')
    .orderBy('geopend', 'asc')
    .orderBy('datum')
};

const getNotificationById = async (idNotificatie) => {
  return await getKnex()(tables.notificatie)
    .leftJoin(
      `${tables.order}`,
      `${tables.notificatie}.idOrder`,
      `${tables.order}.idOrder`
    )
    .where(`${tables.notificatie}.idNotificatie`, idNotificatie)
    .select(`${tables.notificatie}.*`, `${tables.order}.*`)
    .first();
};


const getAllNotificationsByKlantId = async (idKlant, begin) => {
  return getKnex()(tables.notificatie)
  .leftJoin(
    `${tables.order}`,
    `${tables.notificatie}.idOrder`,
    `${tables.order}.idOrder`
  )
  .where(`${tables.order}.idKlant`, idKlant)
  .select(`${tables.notificatie}.*`)
  .orderBy('geopend', 'asc')
  .orderBy('datum', 'asc')
  .limit(10)
  .offset(begin);
};

const getAllNotificationsByLeverancierId = async (idLeverancier, begin) => {
  return getKnex()(tables.notificatie)
  .leftJoin(
    `${tables.order}`,
    `${tables.notificatie}.idOrder`,
    `${tables.order}.idOrder`
  )
  .where(`${tables.order}.idLeverancier`, idLeverancier)
  .select(`${tables.notificatie}.*`)
  .orderBy('geopend', 'asc')
  .orderBy('datum')
  .limit(10)
  .offset(begin);
};

const countUnopenedNotificationsByKlantId = async (idKlant) => {
  return getKnex()(tables.notificatie)
    .leftJoin(
      `${tables.order}`,
      `${tables.notificatie}.idOrder`,
      `${tables.order}.idOrder`
    )
    .where(`${tables.order}.idKlant`, idKlant)
    .andWhere('geopend', false)
    .count(`${tables.notificatie}.idNotificatie as count`);
};

const countUnopenedNotificationsByLeverancierId = async (idLeverancier) => {
  return getKnex()(tables.notificatie)
    .leftJoin(
      `${tables.order}`,
      `${tables.notificatie}.idOrder`,
      `${tables.order}.idOrder`
    )
    .where(`${tables.order}.idLeverancier`, idLeverancier)
    .andWhere('geopend', false)
    .count(`${tables.notificatie}.idNotificatie as count`);
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

const updateNotificationById = async (idNotificatie, { idOrder, text, onderwerp, geopend, afgehandeld,datum }) => {
  await getKnex()(tables.notificatie)
    .where('idNotificatie', idNotificatie)
    .update({
      idOrder,
      text,
      onderwerp,
      geopend,
      afgehandeld,
      datum,
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
  getAllNotificationsByKlantId,
  getAllNotificationsByLeverancierId,
  countUnopenedNotificationsByKlantId,
  countUnopenedNotificationsByLeverancierId,
  
};