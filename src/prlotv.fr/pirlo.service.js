const axios = require("axios");
const FormData = require("form-data");
const db = require("../models/index");

async function get() {
  try {
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
          match.push(estado[x].Column3);
          break;
        }
      }
    }
    let result = match.filter((item, index) => {
      return match.indexOf(item) === index;
    });
    let tournamet = [];
    let game = [];
    let all = [];
    for (let t in result) {
      let elSplit = result[t];
      all = elSplit.split(": ");
      tournamet.push(all[0]);
      game.push(all[1]);
    }
    return {
      data: game,
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
};
