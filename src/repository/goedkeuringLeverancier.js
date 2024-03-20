const { getKnex, tables } = require('../data');

const COLUMNS = [
    'idGoedkeuringLeverancier',
    'idLeverancier',
    'leverancierNummer',
    'gebruikersnaam',
    'email',
    'isActief',
    'roles',
    'iban',
    'btwNummer',
    'telefoonnummer',
    'sector',
    'straat',
    'nummer',
    'stad',
    'postcode',
    'afgehandeld',
    'datumAanvraag',
  ];

const getLaatsteWijziging = async (idLeverancier) => {
    const goedkeuringenLeverancier = await getKnex()(tables.goedkeuringleverancier)
        .where('idLeverancier', idLeverancier)
        .select('datumAanvraag', 'afgehandeld')
        .orderBy('datumAanvraag', 'desc')
        .first();
    return goedkeuringenLeverancier;
}

const getAllGoedkeuringenLeverancier = async (idLeverancier) => {
    const goedkeuringenLeverancier = await getKnex()(tables.goedkeuringleverancier)
        .where('idLeverancier', idLeverancier)
        .select(COLUMNS)
        .orderBy('datumAanvraag', 'desc');
    return goedkeuringenLeverancier;
}

const getGoedkeuringLeverancierById = async (id) => {
    const goedkeuringLeverancier = await getKnex()(tables.goedkeuringleverancier)
        .where('idGoedkeuringLeverancier', id)
        .select(COLUMNS)
        .first();
    return goedkeuringLeverancier;
}

const createGoedkeuringLeverancier = async ({
    idLeverancier,
    leverancierNummer,
    gebruikersnaam,
    email,
    password_hash,
    isActief,
    roles,
    iban,
    btwNummer,
    telefoonnummer,
    sector,
    straat,
    nummer,
    stad,
    postcode,
    afgehandeld,
    datumAanvraag,
}) => {
    
    const [id] = await getKnex()(tables.goedkeuringleverancier).insert({
        idLeverancier,
        leverancierNummer,
        gebruikersnaam,
        email,
        password_hash,
        isActief,
        roles : JSON.stringify(roles),
        iban,
        btwNummer,
        telefoonnummer,
        sector,
        straat,
        nummer,
        stad,
        postcode,
        afgehandeld,
        datumAanvraag,
    });
    return id;
}

const deleteGoedkeuringLeverancierById = async (id) => {
    await getKnex()(tables.goedkeuringleverancier)
        .where('idGoedkeuringLeverancier', id)
        .del();
}

module.exports = {
    getLaatsteWijziging,
    getAllGoedkeuringenLeverancier,
    getGoedkeuringLeverancierById,
    createGoedkeuringLeverancier,
    deleteGoedkeuringLeverancierById,
};