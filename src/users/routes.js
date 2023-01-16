const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
// Rutas
router
  .post("/", usersController.register)
  .put("/", usersController.update)
  .get("/", usersController.get)
  .delete("/", usersController._delete);
module.exports = router;
