// links routes

const express = require("express");
const router = express.Router();
const setLinks = require("../controllers/linksController");

router.post("/", setLinks.createLink);

router.get("/:id", setLinks.getLinksById);

router.get("/user/:id", setLinks.getLinksByUserId);

router.put("/update/:id", setLinks.updateLinksByUserId);

router.delete("/delete/:id", setLinks.deleteLinkById);

module.exports = router;
