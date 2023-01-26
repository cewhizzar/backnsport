const users = require("./matches.service");

async function registerMatches(_req, res, _next) {
  const result = await users.registerMatches();
  return res.status(result.status).json(result);
}

module.exports = {
  registerMatches,
};
