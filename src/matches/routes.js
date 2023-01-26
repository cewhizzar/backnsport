const express = require("express");
const router = express.Router();
const matchesController = require("./matches.controller");
// Rutas
router.get("/register-matches", matchesController.registerMatches);

module.exports = router;
