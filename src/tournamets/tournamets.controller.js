const users = require("./tournamets.service");

async function registerLeagues(req, res, next) {
  const result = await users.registerLeagues();
  return res.status(result.status).json(result);
}
async function get(req, res, next) {
  const result = await users.getAll(req.query);
  return res.status(result.status).json(result);
}

module.exports = {
  registerLeagues,
  get,
};
