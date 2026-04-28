import React, { useState } from "react";
import api from "../services/api";
import PRICES from "../config/prices";

const CreateOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([
    { garmentType: "", quantity: 1, pricePerItem: 0 }
  ]);

  /* =========================
     ADD ROW
  ========================= */
  const addRow = () => {
    setItems([
      ...items,
      { garmentType: "", quantity: 1, pricePerItem: 0 }
    ]);
  };

  /* =========================
     REMOVE ROW
  ========================= */
  const removeRow = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  /* =========================
     UPDATE ROW
  ========================= */
  const updateRow = (i, field, value) => {
    const updated = [...items];

    updated[i][field] = value;

    // auto price fill
    if (field === "garmentType") {
      updated[i].pricePerItem = PRICES[value] || 0;
    }

    setItems(updated);
  };

  /* =========================
     TOTAL
  ========================= */
  const total = items.reduce(
    (acc, i) => acc + (i.quantity || 0) * (i.pricePerItem || 0),
    0
  );

  /* =========================
     SUBMIT ORDER (FIXED)
  ========================= */
  const submit = async () => {
    try {
      // CLEAN INPUTS
      const cleanName = (customerName || "")
        .toString()
        .trim()
        .replace(/\s+/g, " ");

      const cleanPhone = (phone || "")
        .toString()
        .replace(/\D/g, "");

      // NAME VALIDATION (FIXED ONLY ONCE)
      if (!cleanName || cleanName.length < 2) {
        return alert("Enter valid customer name (min 2 characters)");
      }

      // PHONE VALIDATION
      if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        return alert("Enter valid 10-digit mobile number");
      }

      // VALID ITEMS
      const validItems = items.filter(
        (i) => i.garmentType && i.quantity > 0
      );

      if (validItems.length === 0) {
        return alert("Add at least one garment");
      }

      // API CALL
      const res = await api.post("/orders", {
        customerName: cleanName,
        phone: cleanPhone,
        garments: validItems
      });

      alert("Order Created: " + res.data.orderID);

      // RESET
      setCustomerName("");
      setPhone("");
      setItems([{ garmentType: "", quantity: 1, pricePerItem: 0 }]);

    } catch (err) {
      alert(err.response?.data?.message || "Error creating order");
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="container">

      <h2 style={{ marginBottom: "20px" }}>Create Order</h2>

      <div className="card">

        {/* NAME */}
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* PHONE */}
        <input
          placeholder="Phone (10 digits)"
          value={phone}
          maxLength={10}
          onChange={(e) => setPhone(e.target.value)}
        />

        <hr style={{ margin: "15px 0" }} />

        {/* ITEMS */}
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center"
            }}
          >

            {/* GARMENT */}
            <select
              value={item.garmentType}
              onChange={(e) =>
                updateRow(i, "garmentType", e.target.value)
              }
            >
              <option value="">Select Garment</option>
              {Object.keys(PRICES).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {/* QUANTITY */}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateRow(i, "quantity", Number(e.target.value))
              }
            />

            {/* PRICE */}
            <input
              type="number"
              value={item.pricePerItem}
              onChange={(e) =>
                updateRow(i, "pricePerItem", Number(e.target.value))
              }
            />

            {/* DELETE */}
            <button onClick={() => removeRow(i)}>X</button>
          </div>
        ))}

        {/* ADD BUTTON */}
        <button
          onClick={addRow}
          style={{
            marginTop: "10px",
            background: "#111827",
            color: "white"
          }}
        >
          + Add Item
        </button>

        {/* TOTAL */}
        <h2 style={{ marginTop: "20px" }}>
          Total Bill: ₹{total}
        </h2>

        {/* SUBMIT */}
        <button
          className="btn-primary"
          onClick={submit}
          style={{ marginTop: "10px" }}
        >
          Create Order
        </button>

      </div>
    </div>
  );
};

export default CreateOrder;