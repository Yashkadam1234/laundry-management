import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersPerStatus: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/orders/dashboard");
        setData(res.data);
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">

      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      {/* TOP STATS GRID */}
      <div className="grid-4">

        <div className="card stat-blue">
          <h3>Total Orders</h3>
          <h2>{data.totalOrders}</h2>
        </div>

        <div className="card stat-green">
          <h3>Total Revenue</h3>
          <h2>₹{data.totalRevenue}</h2>
        </div>

        <div className="card stat-orange">
          <h3>RECEIVED</h3>
          <h2>{data.ordersPerStatus?.RECEIVED || 0}</h2>
        </div>

        <div className="card stat-yellow">
          <h3>PROCESSING</h3>
          <h2>{data.ordersPerStatus?.PROCESSING || 0}</h2>
        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid-4" style={{ marginTop: "15px" }}>

        <div className="card stat-green">
          <h3>READY</h3>
          <h2>{data.ordersPerStatus?.READY || 0}</h2>
        </div>

        <div className="card stat-purple">
          <h3>DELIVERED</h3>
          <h2>{data.ordersPerStatus?.DELIVERED || 0}</h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;