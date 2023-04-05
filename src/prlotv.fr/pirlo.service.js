const axios = require("axios");
const FormData = require("form-data");
const { JSON } = require("sequelize");
const db = require("../models/index");

async function registerMatches() {
  try {
    //traer y formatear partidos desde la pagina de pirlotv
    let bodyFormData = new FormData();
    bodyFormData.append(
      "link_1496943989",
      "https://www.pirlotv.fr/programacion.php"
    );
    bodyFormData.append("UploadOptions", "HTML,MHTML");
    bodyFormData.append("TableStyle", "null");
    const optionsJson = {
      method: "POST",
      url: "https://api.products.aspose.app/cells/conversion/api/ConversionApi/Convert?outputType=JSON",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    let response = await axios(optionsJson);
    let estado = response.data.Text;
    // estado = JSON.parse(estado);
    let match = [];
    for (let x in estado) {
      for (let y in estado[x]) {
        if (estado[x].Column3) {
          let theMatch = estado[x].Column3;
          theMatch = theMatch.replace(" (OPCION HD)", "");
          match.push(theMatch);
          break;
        }
      }
    }

    let result = match.filter((item, index) => {
      return match.indexOf(item) === index;
    });
    // organizar y registrar matches en la db
    let all = [];
    for (let t in result) {
      let elSplit = result[t];
      all = elSplit.split(": ");
      let tournament = all[0];
      if (tournament === "LaLiga") {
        tournament = "La Liga";
      }
      let game = all[1];
      let img = await db.tournaments.findOne({
        where: {
          name: tournament,
        },
        attributes: ["imageSearch"],
      });
      let noExist =
        "https://www.duke-nus.edu.sg/assets/NUSDuke/img/no_picture.png";
      const matches = new db.matches({
        tournament: tournament,
        game: game,
        img: img ? img.dataValues.imageSearch : noExist,
        state: "offline",
        stream: "", // m3u8 ? m3u8 : "",
      });
      await matches.save();
    }
    return {
      message: "Registro exitoso, sos el mejor",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Algo salio mal",
      status: 500,
    };
  }
}

async function getAllPirloMatches(tournamets) {
  try {
    let theList;
    theList = tournamets.list;
    let matches;
    console.log(theList);

    if (tournamets.list !== "no") {
      theList = theList.replace("[", "");
      theList = theList.replace("]", "");
      // const sinComa = /, /i;
      theList = theList.replace(/, /g, ",");
      let array = theList.split(",");
      array = new Set(array);

      array = [...array];
      console.log(array);
      let amatches = [];

      for (let x in array) {
        let consult = await db.matches.findAll({
          where: {
            tournament: array[x],
          },
          attributes: [
            "game",
            "img",
            "tournament",
            "state",
            "stream",
            "stream2",
          ],
        });
        for (let game in consult) {
          amatches.push(consult[game].dataValues);
        }
      }
      return {
        data: amatches,
        status: 200,
      };
    }
    matches = await db.matches.findAll({
      attributes: ["game", "img", "tournament", "state", "stream", "stream2"],
    });
    if (matches.length === 0) {
      return {
        data: [
          {
            game: "Match not found",
            img: "https://www.duke-nus.edu.sg/assets/NUSDuke/img/no_picture.png",
            tournament: "Tournament not found",
            state: "00:00",
            stream: "",
          },
        ],
        status: 200,
      };
    }

    return {
      data: matches,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Algo salio mal",
      status: 500,
    };
  }
}

async function testJson() {
  try {
    let res = await axios(
      "https://docs.google.com/spreadsheets/d/1fWJ5ntwH0Ln45MEZIT56_JJEfNMWshcD1Tbs6hY9tKs/edit?usp=sharing"
    );

    let body = res.data;
    console.log(body);
    let decoded = JSON.parse(body);
    let json = decoded[0];

    let sozlukanlam = json["anlamlarListe"][0]["anlam"];
    return {
      data: sozlukanlam,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { message: "Algo salio mal", status: 500 };
  }
}
async function convertHTML() {
  try {
    let bodyFormData = new FormData();
    bodyFormData.append(
      "link_1496943989",
      "https://docs.google.com/spreadsheets/d/1fWJ5ntwH0Ln45MEZIT56_JJEfNMWshcD1Tbs6hY9tKs/edit?usp=sharing"
    );
    bodyFormData.append("UploadOptions", "HTML,MHTML");
    bodyFormData.append("TableStyle", "null");
    const optionsJson = {
      method: "POST",
      url: "https://api.products.aspose.app/cells/conversion/api/ConversionApi/Convert?outputType=JSON",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    // const optionsJson = {
    //   method: "GET",
    //   url: "https://docs.google.com/spreadsheets/d/1fWJ5ntwH0Ln45MEZIT56_JJEfNMWshcD1Tbs6hY9tKs/edit?usp=sharing",
    //   // data: bodyFormData,
    //   // headers: { "Content-Type": "multipart/form-data" },
    // };
    let response = await axios(optionsJson);
    let estado = response.data.Text;
    // estado = JSON.parse(estado);
    return {
      data: estado,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { message: "algo salio mal", status: 500 };
  }
}
module.exports = {
  registerMatches,
  getAllPirloMatches,
  convertHTML,
  testJson,
};
