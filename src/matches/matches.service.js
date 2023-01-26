const axios = require("axios");

async function registerMatches() {
  try {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/timezone",
      headers: {
        "X-RapidAPI-Key": "4b50b54460msh336c1d543cba36ep1c67a3jsn480e0bb97ddf",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    let eso = await axios.request(options);
    const matches = eso.data.response;
    console.log(matches);

    return {
      message: matches,
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
};
