const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.get(

    "/dashboard",

    authMiddleware,

    roleMiddleware("RH"),

    adminController.dashboard

);

module.exports = router;