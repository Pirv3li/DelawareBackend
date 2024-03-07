const { getKnex, tables } = require('../data');

const getAllGoedkeuringenLeverancier = async () => {
    const goedkeuringenLeverancier = await getKnex()(tables.goedkeuringleverancier);
    return goedkeuringenLeverancier;
}

const getGoedkeuringLeverancierById = async (id) => {
    const goedkeuringLeverancier = await getKnex()(tables.goedkeuringleverancier)
        .where('idGoedkeuringLeverancier', id)
        .first();
    return goedkeuringLeverancier;
}

const createGoedkeuringLeverancier = async ({ leverancierNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idLeverancier }) => {
    
    const [id] = await getKnex()(tables.goedkeuringleverancier).insert({
        leverancierNummer,
        gebruikersnaam,
        email,
        password_hash,
        isActief,
        roles: JSON.stringify(roles),
        idBedrijf,
        idLeverancier
    });
    return id;
}

const deleteGoedkeuringLeverancierById = async (id) => {
    await getKnex()(tables.goedkeuringleverancier)
        .where('idGoedkeuringLeverancier', id)
        .del();
}

module.exports = {
    getAllGoedkeuringenLeverancier,
    getGoedkeuringLeverancierById,
    createGoedkeuringLeverancier,
    deleteGoedkeuringLeverancierById,
};