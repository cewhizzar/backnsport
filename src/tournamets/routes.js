const express = require("express");
const router = express.Router();
const usersController = require("./tournamets.controller");
// Rutas
router.get("/", usersController.get);

module.exports = router;
