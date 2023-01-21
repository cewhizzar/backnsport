const express = require("express");
const router = express.Router();
const usersController = require("./tournamets.controller");
// Rutas
router.post("/register-tournamets", usersController.registerLeagues);
router.get("/tournamets-page", usersController.get);

module.exports = router;
