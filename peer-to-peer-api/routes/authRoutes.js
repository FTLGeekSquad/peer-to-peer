const express = require("express");
const router = express.Router();
const {getProtected, login, callback} = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.get("/protected_route", verifyToken, getProtected);

router.get("/login", login);

router.get("/google/callback", callback)

module.exports = router;