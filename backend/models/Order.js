const mongoose = require("mongoose");

/* =========================
   GARMENT SCHEMA
========================= */
const garmentSchema = new mongoose.Schema({
  garmentType: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  pricePerItem: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    default: 0
  }
});

/* =========================
   ORDER SCHEMA
========================= */
const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      unique: true,
      index: true
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-z\s]+$/.test(v); // ❌ no numbers allowed
        },
        message: "Customer name must contain only letters"
      }
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v); // ✅ Indian 10-digit
        },
        message: "Invalid phone number"
      }
    },

    garments: {
      type: [garmentSchema],
      required: true
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
      default: "RECEIVED"
    },

    estimatedDeliveryDate: {
      type: Date,
      default: () =>
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }
  },
  {
    timestamps: true
  }
);

/* =========================
   AUTO CALCULATIONS
========================= */

// 🔁 Calculate subtotal + total before save
orderSchema.pre("save", function (next) {
  if (!this.garments || this.garments.length === 0) {
    return next();
  }

  let total = 0;

  this.garments.forEach((item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.pricePerItem) || 0;

    item.subtotal = qty * price;
    total += item.subtotal;
  });

  this.totalAmount = total;

  next();
});

/* =========================
   AUTO ORDER ID (SAFE)
========================= */

orderSchema.pre("save", async function (next) {
  if (this.orderID) return next();

  try {
    const lastOrder = await mongoose
      .model("Order")
      .findOne()
      .sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastOrder && lastOrder.orderID) {
      const num = parseInt(lastOrder.orderID.split("-")[1]);
      nextNumber = num + 1;
    }

    this.orderID = `LAU-${String(nextNumber).padStart(3, "0")}`;
    next();

  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Order", orderSchema);