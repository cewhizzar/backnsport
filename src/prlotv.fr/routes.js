const express = require("express");
const router = express.Router();
const usersController = require("./pirlo.controller");
// Rutas
router.get("/", usersController.get);

module.exports = router;
