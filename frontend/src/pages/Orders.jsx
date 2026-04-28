import React, { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  /* =========================
     FETCH ORDERS
  ========================= */
  const fetchOrders = async () => {
    try {
      let query = [];

      if (search) query.push(`search=${search}`);
      if (status) query.push(`status=${status}`);

      const queryString = query.length ? `?${query.join("&")}` : "";

      const res = await api.get(`/orders${queryString}`);
      setOrders(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, status]);

  /* =========================
     UPDATE STATUS
  ========================= */
  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  /* =========================
     DELETE ORDER
  ========================= */
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  /* =========================
     FORMAT DATE
  ========================= */
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };

  /* =========================
     GARMENT SUMMARY
  ========================= */
  const getGarmentSummary = (garments) => {
    if (!garments || garments.length === 0) return "-";
    return garments.map((g) => `${g.garmentType} x${g.quantity}`).join(", ");
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Orders</h2>

      {/* 🔍 FILTER BAR */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="status-filter"
        >
          <option value="">All Status</option>
          <option value="RECEIVED">RECEIVED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="READY">READY</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>

      {/* 📋 TABLE */}
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#111827", color: "white" }}>
              <th style={th}>Order ID</th>
              <th style={th}>Customer</th>
              <th style={th}>Phone</th>
              <th style={th}>Garments</th>
              <th style={th}>Total</th>
              <th style={th}>Status</th>
              <th style={th}>Delivery Date</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}>{o.orderID}</td>
                <td style={td}>{o.customerName}</td>
                <td style={td}>{o.phone}</td>

                <td style={td}>{getGarmentSummary(o.garments)}</td>

                <td style={td}>₹{o.totalAmount}</td>

                <td style={td}>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o._id, e.target.value)
                    }
                    style={{
                      padding: "6px",
                      borderRadius: "6px"
                    }}
                  >
                    <option value="RECEIVED">RECEIVED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="READY">READY</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </td>

                <td style={td}>
                  {formatDate(o.estimatedDeliveryDate)}
                </td>

                <td style={td}>
                  <button
                    className="btn-danger"
                    onClick={() => deleteOrder(o._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* =========================
   STYLES
========================= */

const th = {
  padding: "12px",
  textAlign: "left"
};

const td = {
  padding: "12px"
};

export default Orders;