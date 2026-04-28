const Order = require("../models/Order");

/* =========================
   GENERATE ORDER ID
========================= */
const generateOrderID = () => {
  return `LAU-${Date.now()}`;
};

/* =========================
   CREATE ORDER
========================= */
exports.createOrder = async (req, res) => {
  try {
    let { customerName, phone, garments } = req.body;

    // 🧹 CLEAN INPUTS
    customerName = (customerName || "")
      .toString()
      .trim()
      .replace(/\s+/g, " ");

    phone = (phone || "")
      .toString()
      .replace(/\D/g, "");

    // 🔴 STRONG NAME VALIDATION (FIX ADDED)
    const nameRegex = /^[A-Za-z ]+$/;

    if (
      !customerName ||
      customerName.length < 2 ||
      !nameRegex.test(customerName)
    ) {
      return res.status(400).json({
        message: "Name must contain only letters (no numbers allowed)"
      });
    }

    // 🔴 PHONE VALIDATION
    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        message: "Enter valid 10-digit mobile number"
      });
    }

    // 🔴 GARMENTS VALIDATION
    if (!Array.isArray(garments) || garments.length === 0) {
      return res.status(400).json({
        message: "At least one garment is required"
      });
    }

    for (let item of garments) {
      if (!item.garmentType || item.garmentType.trim() === "") {
        return res.status(400).json({
          message: "Garment type is required"
        });
      }

      if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than 0"
        });
      }

      if (
        item.pricePerItem === undefined ||
        isNaN(item.pricePerItem) ||
        item.pricePerItem < 0
      ) {
        return res.status(400).json({
          message: "Invalid price per item"
        });
      }
    }

    // 💰 TOTAL CALCULATION
    const totalAmount = garments.reduce((acc, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.pricePerItem) || 0;
      return acc + qty * price;
    }, 0);

    // 🆔 ORDER ID
    const orderID = await generateOrderID();

    // 📦 CREATE ORDER
    const order = await Order.create({
      orderID,
      customerName,
      phone,
      garments,
      totalAmount
    });

    res.status(201).json({
      message: "Order created successfully",
      orderID: order.orderID,
      order
    });

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* =========================
   GET ORDERS
========================= */
exports.getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phone: search }
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE STATUS
========================= */
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE ORDER
========================= */
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.json({ message: "Order deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DASHBOARD
========================= */
exports.dashboard = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((acc, o) => {
      return acc + (Number(o.totalAmount) || 0);
    }, 0);

    const ordersPerStatus = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    };

    orders.forEach((o) => {
      if (ordersPerStatus[o.status] !== undefined) {
        ordersPerStatus[o.status]++;
      }
    });

    res.json({
      totalOrders,
      totalRevenue,
      ordersPerStatus
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};