const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete();

    await knex(tables.product).insert([
      {
        idProduct: 1,
        idLeverancier: 1,
        naam: "Samsung RB34C605CB1/EF",
        eenheidsprijs: 700,
        btwtarief: 21,
        foto: "https://images.samsung.com/is/image/samsung/p6pim/cz/rb34c605cb1-ef/gallery/cz-rb7300t-wifi-459347-rb34c605cb1-ef-thumb-536510085?$480_480_PNG$",
        aantal: 5,
        categorie: "Koelkast",
        gewicht: 20,
        beschrijving:
          "Samsung koelkast met ruime inhoud en energiezuinige werking.",
      },
      {
        idProduct: 2,
        idLeverancier: 2,
        naam: "LG GX Gallery Series OLED",
        eenheidsprijs: 2500,
        btwtarief: 21,
        foto: "https://www.lg.com/eastafrica/images/Oled-microsite/GX/TV-OLED-Brandsite-GX-01-Mobile-new.jpg",
        aantal: 8,
        categorie: "TV",
        gewicht: 35,
        beschrijving:
          "Prachtige OLED TV met dun profiel, perfect voor een moderne woonkamer.",
      },
      {
        idProduct: 3,
        idLeverancier: 3,
        naam: "Bosch Serie 8",
        eenheidsprijs: 900,
        btwtarief: 21,
        foto: "https://media3.bosch-home.com/Product_Shots/600x337/MCSA01697655_G4198_SMV88TX36E_1144049_korr_def.jpg",
        aantal: 10,
        categorie: "Vaatwasser",
        gewicht: 45,
        beschrijving:
          "Stille vaatwasser met verschillende programma's en energiezuinige werking.",
      },
      {
        idProduct: 4,
        idLeverancier: 1,
        naam: "Whirlpool W11 CM145",
        eenheidsprijs: 600,
        btwtarief: 21,
        foto: "https://www.loeters.be/s/picture/465523610/800/600/whirlpool-w11-cm145.jpg?language=nl",
        aantal: 12,
        categorie: "koffiemachine",
        gewicht: 20,
        beschrijving:
          "Volautomatische espressomachine met melkopschuimer, perfect voor thuisgebruik.",
      },
      {
        idProduct: 5,
        idLeverancier: 2,
        naam: "Liebherr GNP 2313",
        eenheidsprijs: 800,
        btwtarief: 21,
        foto: "https://content.hwigroup.net/images/products_500x300/290812/liebherr-gnp-2313-21-a.jpg",
        aantal: 6,
        categorie: "Vriezer",
        gewicht: 80,
        beschrijving:
          "Ruime vriezer met No Frost technologie, ideaal voor het bewaren van grote hoeveelheden voedsel.",
      },
      {
        idProduct: 6,
        idLeverancier: 3,
        naam: "Bauknecht EMPK7 9345 PT",
        eenheidsprijs: 1200,
        btwtarief: 21,
        foto: "https://whirlpool-cdn.thron.com/delivery/public/thumbnail/whirlpool/pi-7f0cb4d4-6f6d-4f02-87a0-ce8a5a1bd88d/jsind9/std/1000x1000/bs-2677f-cpal-kookplaten-8.webp?fill=zoom&fillcolor=rgba:255,255,255&scalemode=product&format=WEBP",
        aantal: 9,
        categorie: "Kookplaat",
        gewicht: 25,
        beschrijving:
          "Stijlvolle inductiekookplaat met geïntegreerde afzuiging, perfect voor een moderne keuken.",
      },
      {
        idProduct: 7,
        idLeverancier: 2,
        naam: "Siemens HB878GBS6B",
        eenheidsprijs: 1400,
        btwtarief: 21,
        foto: "https://media3.bsh-group.com/Product_Shots/1600x900/MCSA02760075_HB878GBB6B_Siemens_STP_FullSizeCooker__IC6_def.png",
        aantal: 7,
        categorie: "Oven",
        gewicht: 40,
        beschrijving:
          "Multifunctionele inbouwoven met pyrolytische reiniging en stoomfunctie voor perfecte resultaten.",
      },
      {
        idProduct: 8,
        idLeverancier: 3,
        naam: "Sharp R-961INW",
        eenheidsprijs: 300,
        btwtarief: 21,
        foto: "https://media.s-bol.com/qxRlVov00jmk/550x337.jpg",
        aantal: 15,
        categorie: "Magnetron",
        gewicht: 30,
        beschrijving:
          "Ruime combimagnetron met grill- en heteluchtfuncties, perfect voor drukke keukens.",
      },
      {
        idProduct: 9,
        idLeverancier: 1,
        naam: "LG GSL760PZXV",
        eenheidsprijs: 1800,
        btwtarief: 21,
        foto: "https://image.coolblue.be/600x315/products/804194",
        aantal: 5,
        categorie: "Koelkast",
        gewicht: 150,
        beschrijving:
          "Grote Amerikaanse koelkast met water- en ijsdispenser, ideaal voor gezinnen.",
      },
      {
        idProduct: 10,
        idLeverancier: 2,
        naam: "Miele G 7100 SCU",
        eenheidsprijs: 1000,
        btwtarief: 21,
        foto: "https://cdn.niwzi.be/images/ez_prod/2987/514772/hires/g-7200-scu-bw-1-1653404843_1000x1000.png",
        aantal: 8,
        categorie: "Vaatwasser",
        gewicht: 50,
        beschrijving:
          "Stille en energiezuinige vaatwasser met uitgebreide programma-opties en besteklade.",
      },
    ]);
  },
};
