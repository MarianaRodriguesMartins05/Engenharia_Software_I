const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const timeRecordRoutes = require("./timeRecordRoutes");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const employeeRoutes = require("./employeeRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/time-records", timeRecordRoutes);
router.use("/admin", adminRoutes);
router.use("/employees", employeeRoutes);

module.exports = router;