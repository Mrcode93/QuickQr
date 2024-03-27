// links routes

const express = require("express");
const Link = require("../models/linksModel");
const router = express.Router();
const setLinks = require("../controllers/linksController");

router.post("/", setLinks.createLink);

router.get("/:id", setLinks.getLinksById);

module.exports = router;
