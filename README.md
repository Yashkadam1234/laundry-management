
#  Laundry Management System

A full-stack Laundry Management System built to manage customer orders efficiently.
It allows creating orders, tracking status, calculating totals, and managing deliveries through a clean dashboard interface.

---
 Live demmo link (https://laundry-management-1-1z30.onrender.com)

##  Screenshots

### Login Page
![Login](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Create Order
![Create Order](screenshots/create-order.png)

### Orders List
![Orders](screenshots/orders.png)

#  Setup Instructions

##  1. Clone the Repository

```bash
git clone https://github.com/your-username/laundry-management-system.git
cd laundry-management-system
```

---

##  2. Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://yashkadam:Yashkadam%4030@ac-xjgkpzt-shard-00-00.g2zxcdc.mongodb.net:27017,ac-xjgkpzt-shard-00-01.g2zxcdc.mongodb.net:27017,ac-xjgkpzt-shard-00-02.g2zxcdc.mongodb.net:27017/laundry-crm?ssl=true&replicaSet=atlas-13lvn6-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=super_secret_key_123
```

### Run backend:

```bash
npm run dev
```

---

##  3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

##  4. Open App

```
http://localhost:5173
```

---

#   Features Implemented

### 🧾 Order Management

* Create new laundry orders
* Auto-generated Order IDs (LAU-001 format)
* Add multiple garments per order
* Automatic total bill calculation

### 📱 Validation System

* Customer name validation (no numbers, min 2 chars)
* Indian mobile number validation (10 digits, starts 6–9)
* Garment validation (type, quantity, price)

###  Search & Filter

* Search orders by:
  * Customer name
* Filter by status:
  * RECEIVED
  * PROCESSING
  * READY
  * DELIVERED

###  Dashboard
* Total orders
* Total revenue
* Orders grouped by status (RECEIVED ,PROCESSING ,READY , DELIVERED)

###  Order Table Enhancements

* Garments summary (e.g., `Shirt x2, Pants x1`)
* Estimated delivery date (auto +3 days)
* Status update dropdown
* Delete order option

---

#  AI Usage Report

## 🔹 Tools Used

* ChatGPT (primary)
* GitHub Copilot (for suggestions)

---

##   Sample Prompts Used

*  “I want to build a simple laundry management system using React, Node.js, and MongoDB. help with the code structure”
*  add proper validation for customer name and phone number, I want to make sure the name doesn’t contain numbers and the phone is a valid 10-digit Indian number.”
* *"Fix Express route error undefined callback"*
* *"Add search and filter in React table with API query params"*
* *"Improve UI alignment and styling for dashboard cards"*

---

##   What AI Got Wrong

* Missed proper MongoDB connection handling (`MONGO_URI undefined`)
* Incorrect validation logic initially (allowed invalid inputs)
* Some UI suggestions caused layout breaking
* some small missing code part which caused big problem but recoganized timely 

---

## 🔹 What Was Improved Manually

* Fixed backend structure and routing errors
* Cleaned validation logic (name + phone)
* Debugged API connection issues
* Refined UI layout and spacing manually
* Improved data formatting (dates, garments summary)

---

#   Tradeoffs

## 🔹 What Was Skipped

* Payment integration
* SMS/notification system
* Role-based access (admin/user)

---

## 🔹 What Could Be Improved

With more time, I would:

*  Add real-time updates (WebSockets)
*  Improve UI with Tailwind / component library
*  Add analytics charts
*  Deploy with Docker for scalability
*  Role-based access (admin/user)

---

#  Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Styling:** CSS

---

#  Deployment

Recommended setup:

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

#  Conclusion

This project demonstrates full-stack development skills including:

* API design
* Database modeling
* Validation handling
* UI/UX improvements
* Debugging real-world issues

---

 
