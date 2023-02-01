const axios = require("axios");
const FormData = require("form-data");
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
    estado = JSON.parse(estado);
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
      let noExist = "https://media-3.api-sports.io/football/leagues/1.png";
      const matches = new db.matches({
        tournament: tournament,
        game: game,
        img: img ? img.dataValues.imageSearch : noExist,
        state: "offline",
        stream: m3u8 ? m3u8 : "",
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

async function getAllPirloMatches() {
  try {
    let matches = await db.matches.findAll({
      attributes: ["game", "img", "tournament", "state", "stream"],
    });
    if (matches.length === 0) {
      return {
        data: [
          {
            game: "Match not found",
            img: "https://media-3.api-sports.io/football/leagues/1.png",
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
async function get() {
  try {
    let matches = [
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
      "Toronja vs Cuatro",
    ];

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

module.exports = {
  registerMatches,
  getAllPirloMatches,
  get,
};
