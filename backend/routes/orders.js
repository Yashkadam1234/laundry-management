const express = require("express");
const {
  createOrder,
  getOrders,
  updateStatus,
  deleteOrder,
  dashboard
} = require("../controllers/ordersController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.patch("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteOrder);
router.get("/dashboard", protect, dashboard);

module.exports = router;