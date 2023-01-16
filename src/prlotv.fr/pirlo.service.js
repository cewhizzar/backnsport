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
    let respuesta = await axios(optionsJson);
    console.log(respuesta.data.Text);
    return {
      data: "elJson",
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
};
