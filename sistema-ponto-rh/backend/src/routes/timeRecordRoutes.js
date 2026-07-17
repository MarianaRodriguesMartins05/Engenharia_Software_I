const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const controller = require("../controllers/timeRecordController");
const router = express.Router();

router.post(
    "/",
    authMiddleware,
    controller.register
);

router.get(
    "/history",
    authMiddleware,
    controller.history
);

router.get(
    "/all",
    authMiddleware,
    roleMiddleware("RH"),
    controller.list
);

module.exports = router;