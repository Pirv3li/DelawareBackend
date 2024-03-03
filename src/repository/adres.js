const {getKnex, tables} = require('../data')

const getAllAdressen = async() => {
    return getKnex()(tables.adres)
        .select('*')
        .orderBy('laatstGebruikt', 'desc');
};


const getAdresById = async (id) => {
    const adres = await getKnex()(tables.adres)
    .where('idAdres', id)
    .first();

    return adres;
}

const createAdres = async ({straat, nummer, stad, postcode, laatstGebruikt}) => {
    const [id] = await getKnex()(tables.adres).insert({
        straat,
        nummer,
        stad,
        postcode,
        laatstGebruikt,
    })
    return id;
}

const updateAdresById = async (id, { straat, nummer, stad, postcode, laatstGebruikt }) => {
    await getKnex()(tables.adres)
    .where(`${tables.adres}.idAdres`, id)
    .update({
        straat: straat,
        nummer: nummer,
        stad: stad,
        postcode: postcode,
        laatstGebruikt: laatstGebruikt,
    })
    return id;
}

const deleteAdresById = async (id) => {
    await getKnex()(tables.adres)
    .where('idAdres', id).del()
}

module.exports = {
    getAllAdressen,
    getAdresById,
    createAdres,
    updateAdresById,
    deleteAdresById,
}