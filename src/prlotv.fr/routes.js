const express = require("express");
const router = express.Router();
const matchController = require("./pirlo.controller");
// Rutas
router.get("/match-page", matchController.getAllPirloMatches);
router.get("/register-pirlo-matches", matchController.registerMatches);
router.get("/register-pirlo-matche", matchController.testJson);

module.exports = router;
