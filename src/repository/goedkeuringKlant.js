const { getKnex, tables } = require('../data');

const getAllGoedkeuringenKlant = async (idKlant) => {
    const goedkeuringKlant = await getKnex()(tables.goedkeuringklant).where('idKlant', idKlant);
    return goedkeuringKlant;
}

const getGoedkeuringKlantById = async (id) => {
    const goedkeuringKlant = await getKnex()(tables.goedkeuringklant)
        .where('idGoedkeuringKlant', id)
        .first();
    return goedkeuringKlant;
}

const createGoedkeuringKlant = async ({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant }) => {
    
    const [id] = await getKnex()(tables.goedkeuringklant).insert({
        klantNummer,
        gebruikersnaam,
        email,
        password_hash,
        isActief,
        roles: JSON.stringify(roles),
        idBedrijf,
        idKlant
    });
    return id;
}

const deleteGoedkeuringKlantById = async (id) => {
    await getKnex()(tables.goedkeuringklant)
        .where('idGoedkeuringKlant', id)
        .del();
}

module.exports = {
    getAllGoedkeuringenKlant,
    getGoedkeuringKlantById,
    createGoedkeuringKlant,
    deleteGoedkeuringKlantById,
};