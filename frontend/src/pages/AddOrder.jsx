import React, { useState } from "react";
import PRICES from "../config/prices";

const AddOrder = () => {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garmentType: "",
    quantity: 1,
    pricePerItem: 0
  });

  // 👕 Auto-fill price when garment changes
  const handleGarmentChange = (type) => {
    setForm((prev) => ({
      ...prev,
      garmentType: type,
      pricePerItem: PRICES[type] || 0
    }));
  };

  // 📝 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 📦 Submit (example)
  const handleSubmit = (e) => {
    e.preventDefault();

    const subtotal = form.quantity * form.pricePerItem;

    const orderData = {
      ...form,
      subtotal
    };

    console.log("Order Created:", orderData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Laundry Order</h2>

      <form onSubmit={handleSubmit}>
        {/* Customer Name */}
        <input
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
        />
        <br /><br />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <br /><br />

        {/* Garment Dropdown */}
        <select
          value={form.garmentType}
          onChange={(e) => handleGarmentChange(e.target.value)}
        >
          <option value="">Select Garment</option>
          <option value="Shirt">Shirt</option>
          <option value="Pants">Pants</option>
          <option value="Saree">Saree</option>
          <option value="Jacket">Jacket</option>
          <option value="Bedsheet">Bedsheet</option>
          <option value="Curtain">Curtain</option>
          <option value="Suit">Suit</option>
        </select>

        <br /><br />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />

        <br /><br />

        {/* Price per item (auto-filled but editable) */}
        <input
          type="number"
          name="pricePerItem"
          value={form.pricePerItem}
          onChange={(e) =>
            setForm({
              ...form,
              pricePerItem: Number(e.target.value)
            })
          }
          placeholder="Price per item"
        />

        <br /><br />

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default AddOrder;