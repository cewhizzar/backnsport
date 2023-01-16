const users = require("./pirlo.service");

async function get(_req, res, _next) {
  try {
    const result = await users.get();
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
};
