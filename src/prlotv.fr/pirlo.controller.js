const match = require("./pirlo.service");

async function registerMatches(_req, res, _next) {
  try {
    const result = await match.registerMatches();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function testJson(_req, res, _next) {
  try {
    const result = await match.testJson();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getAllPirloMatches(req, res, _next) {
  try {
    const result = await match.getAllPirloMatches(req.query);
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  registerMatches,
  getAllPirloMatches,
  testJson,
};
