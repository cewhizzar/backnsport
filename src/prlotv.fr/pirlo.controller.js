const match = require("./pirlo.service");

async function registerMatches(_req, res, _next) {
  try {
    const result = await match.registerMatches();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getAllPirloMatches(_req, res, _next) {
  try {
    const result = await match.getAllPirloMatches();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function get(_req, res, _next) {
  try {
    const result = await match.get();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registerMatches,
  getAllPirloMatches,
  get,
};
