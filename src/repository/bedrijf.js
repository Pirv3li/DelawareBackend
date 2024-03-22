const { getKnex, tables } = require("../data");

const formatBedrijf = (result) => {
  const formattedResult = {
    idBedrijf: result.idBedrijf,
    naam: result.naam,
    logo: result.logo,
    sector: result.sector,
    iban: result.iban,
    btwNummer: result.btwNummer,
    email: result.email,
    telefoonnummer: result.telefoonnummer,
    gebruikerSinds: result.gebruikerSinds,
    Adres: {
      idAdres: result.idAdres,
      straat: result.straat,
      nummer: result.nummer,
      stad: result.stad,
      postcode: result.postcode,
      laatstGebruikt: result.laatstGebruikt,
    },
  };

  if (result.idKlant) {
    formattedResult.Klant = {
      idKlant: result.idKlant,
      klantNummer: result.klantNummer,
      gebruikersnaam: result.gebruikersnaam,
      email: result.email,
      isActief: result.isActief,
      roles: result.roles,
    };
  }

  if (result.idLeverancier) {
    formattedResult.Leverancier = {
      idLeverancier: result.idLeverancier,
      leverancierNummer: result.leverancierNummer,
      gebruikersnaam: result.gebruikersnaam,
      email: result.email,
      isActief: result.isActief,
      roles: result.roles,
    };
  }

  return formattedResult;
};



const getBedrijfById = async (id) => {
  const bedrijf = await getKnex()(tables.bedrijf)
    .select("*")
    .leftJoin(
      `${tables.adres}`,
      `${tables.bedrijf}.idAdres`,
      `${tables.adres}.idAdres`
    )
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .first();

  return formatBedrijf(bedrijf);
};

const findBedrijfByName = (naam) => {
  return getKnex()(tables.bedrijf).where("naam", naam).first();
};

const getBedrijfByKlantId = async (id) => {
  const bedrijf = await getKnex()(tables.bedrijf)
    .select("*")
    .leftJoin(
      `${tables.adres}`,
      `${tables.bedrijf}.idAdres`,
      `${tables.adres}.idAdres`
    )
    .rightJoin(
      `${tables.klant}`,
      `${tables.bedrijf}.idBedrijf`,
      `${tables.klant}.idBedrijf`
    )
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .first();

  return formatBedrijf(bedrijf);
};

const getBedrijfByLeverancierId = async (id) => {
  const bedrijf = await getKnex()(tables.bedrijf)
    .select("*")
    .leftJoin(
      `${tables.adres}`,
      `${tables.bedrijf}.idAdres`,
      `${tables.adres}.idAdres`
    )
    .rightJoin(
      `${tables.leverancier}`,
      `${tables.bedrijf}.idBedrijf`,
      `${tables.leverancier}.idBedrijf`
    )
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .first();

  return formatBedrijf(bedrijf);
};

module.exports = {
  getBedrijfById,
  findBedrijfByName,
  getBedrijfByKlantId,
  getBedrijfByLeverancierId,
};
