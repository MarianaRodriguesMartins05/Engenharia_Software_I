const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("RH"),
    employeeController.create
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("RH"),
    employeeController.list
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("RH"),
    employeeController.get
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("RH"),
    employeeController.update
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("RH"),
    employeeController.remove
);

module.exports = router;