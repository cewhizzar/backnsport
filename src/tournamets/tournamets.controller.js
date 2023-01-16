const users = require("./tournamets.service");

async function get(req, res, next) {
  const result = await users.get();
  return res.status(result.status).json(result);
}

module.exports = {
  get,
};
