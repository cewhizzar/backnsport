const axios = require("axios");
const db = require("../models/index");

async function registerLeagues() {
  try {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
      headers: {
        "X-RapidAPI-Key": "4b50b54460msh336c1d543cba36ep1c67a3jsn480e0bb97ddf",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    let eso = await axios.request(options);
    const leagues = eso.data.response;
    for (let x in leagues) {
      let name = leagues[x].league.name;
      let type = leagues[x].league.type;
      let img = leagues[x].league.logo;
      let country = leagues[x].country.name;
      console.log(name, type, img, country);
      const tournament = new db.tournaments({
        name: name,
        country: country,
        imageSearch: img,
        type: type,
      });
      await tournament.save();
    }
    return {
      message: "Registro exitoso, sos el mejor",
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAll() {
  let allTournamets = await db.tournaments.findAll();
  return {
    data: allTournamets,
    status: 200,
  };
}
module.exports = {
  registerLeagues,
  getAll,
};
