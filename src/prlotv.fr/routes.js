const express = require("express");
const router = express.Router();
const matchController = require("./pirlo.controller");
// Rutas
router.get("/match-page", matchController.getAllPirloMatches);
router.get("/", matchController.get);
router.post("/register-pirlo-matches", matchController.registerMatches);

module.exports = router;
