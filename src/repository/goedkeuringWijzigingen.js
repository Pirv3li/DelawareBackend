const { getKnex, tables } = require('../data');

const getAllGoedkeuringWijzigingen = async () => {
    const goedkeuringWijzigingen = await getKnex()(tables.goedkeuringWijzigingen);
    return goedkeuringWijzigingen;
}

const getGoedkeuringWijzigingById = async (id) => {
    const goedkeuringWijziging = await getKnex()(tables.goedkeuringWijzigingen)
        .where('idGoedkeuring', id)
        .first();
    return goedkeuringWijziging;
}

const createGoedkeuringWijziging = async ({ gebruikerNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf }) => {
    const [id] = await getKnex()(tables.goedkeuringWijzigingen).insert({
        gebruikerNummer,
        gebruikersnaam,
        email,
        password_hash,
        isActief,
        roles: JSON.stringify(roles),
        idBedrijf
    });
    return id;
}

const deleteGoedkeuringWijzigingById = async (id) => {
    await getKnex()(tables.goedkeuringWijzigingen)
        .where('idGoedkeuring', id)
        .del();
}

module.exports = {
    getAllGoedkeuringWijzigingen,
    getGoedkeuringWijzigingById,
    createGoedkeuringWijziging,
    deleteGoedkeuringWijzigingById,
};