const {getKnex, tables} = require('../data')


const getAllBedrijven = async() => {
    return getKnex()(tables.bedrijf)
        .select(
            `${tables.bedrijf}.idBedrijf`,
            `${tables.bedrijf}.naam`,
            `${tables.bedrijf}.logo`,
            `${tables.bedrijf}.sector`,
            `${tables.bedrijf}.iban`,
            `${tables.bedrijf}.btwNummer`,
            `${tables.bedrijf}.telefoonnummer`,
            `${tables.bedrijf}.gebruikerSinds`,
            `${tables.bedrijf}.idAdres`,
        )
};

const getBedrijfById = async (id) => {
    const Bedrijf = await getKnex()(tables.bedrijf)
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .first(
        `${tables.bedrijf}.idBedrijf`,
        `${tables.bedrijf}.naam`,
        `${tables.bedrijf}.logo`,
        `${tables.bedrijf}.sector`,
        `${tables.bedrijf}.iban`,
        `${tables.bedrijf}.btwNummer`,
        `${tables.bedrijf}.telefoonnummer`,
        `${tables.bedrijf}.gebruikerSinds`,
        `${tables.bedrijf}.idAdres`,
    )

    return Bedrijf
}

const findBedrijfByName = (naam) => {
    return getKnex()(tables.bedrijf).where('naam', naam).first();
  };

const createBedrijf = async ({naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres}) => {
    const [id] = await getKnex()(tables.bedrijf).insert({
        naam,
        logo,
        sector,
        iban,
        btwNummer,
        telefoonnummer,
        gebruikerSinds,
        idAdres,
    })
    return id
}

const updateBedrijfById = async (id, { naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres }) => {
    await getKnex()(tables.bedrijf)
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .update({
        naam,
        logo,
        sector,
        iban,
        btwNummer,
        telefoonnummer,
        gebruikerSinds,
        idAdres,
    })
}

const deleteBedrijfById = async (id) => {
    await getKnex()(tables.bedrijf)
    .where(`${tables.bedrijf}.idBedrijf`, id).del()
}

module.exports = {
    getAllBedrijven,
    getBedrijfById,
    createBedrijf,
    updateBedrijfById,
    deleteBedrijfById,
    findBedrijfByName,
}