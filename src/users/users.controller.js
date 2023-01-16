const users = require("./users.service");

async function register(req, res, next) {
  const result = await users.register(req.body);
  return res.status(result.status).json(result);
}

async function get(req, res, next) {
  const result = await users.get();
  return res.status(result.status).json(result);
}

async function _delete(req, res, next) {
  const result = await users._delete(req.query.id);
  return res.status(result.status).json(result);
}

async function update(req, res, next) {
  const result = await users.update(req.body);
  return res.status(result.status).json(result);
}

module.exports = {
  register,
  get,
  _delete,
  update,
};
