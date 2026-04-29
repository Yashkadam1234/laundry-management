
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

## 🤖 AI Usage Report

### Tools Used
- ChatGPT GPT-4

---

### Prompts I Used

1. "Set up a full-stack Laundry Order Management 
System with React, Node.js, MongoDB structured 
for Vercel serverless..."

2. "Create Mongoose schemas for laundry orders 
with auto-generated order ID like LAU-001..."

3. "Build complete Express backend with JWT auth, 
protected routes, dashboard aggregation..."

4. "Build complete React frontend with login, 
register, dashboard, create order, orders list..."

5. "Add styling to all pages — navbar, cards, 
table, forms..."

---

### Where AI Helped Most 

- Generated entire folder structure instantly
- Wrote all Mongoose schemas correctly
- Set up JWT auth middleware
- Built dashboard aggregation query in MongoDB
- Created React Router protected routes
- Wrote all axios API calls in api.js
- Generated CSS styling for all pages
- Saved approximately 8-10 hours of work

---

### Where AI Got It Wrong 

- MongoDB connection string format was wrong 
  for standard connection (non-SRV)
- Navbar was showing on Login/Register pages
- Garment price was not auto-filling when 
  garment type was selected
- Search bar and filter disappeared after 
  adding new columns to orders table
- Dashboard cards were wrapping to second row 
  instead of staying in one row

---

### What I Fixed Manually 

- Fixed MongoDB connection string by switching 
  from SRV to standard connection format
- Fixed navbar visibility by checking current 
  path using useLocation hook
- Fixed garment price auto-fill by connecting 
  prices config to dropdown onChange event
- Fixed orders table by re-adding search bar 
  and filter dropdown after table update
- Fixed dashboard layout using CSS flexbox

---

### What I Learned From AI Mistakes

- AI generates working code but misses small 
  UI/UX details that matter in real usage
- Always test each feature after AI generates 
  code before moving to next step
- AI is great for structure and logic but 
  needs human review for user experience

---

### Time Saved Using AI
- Estimated time without AI: 3-4 days
- Actual time with AI: 1 day
- Time saved: ~2-3 days

## ⚖️ Tradeoffs

### What I Skipped
- SMS notifications to customers when 
  order is ready
- Print receipt functionality
- Password reset functionality
- Order edit functionality after creation

### What I'd Improve With More Time
- Add SMS/WhatsApp notification when 
  order status changes to READY
- Add print receipt button for each order
- Add analytics charts on dashboard showing
  weekly/monthly revenue trends
- Add ability to edit orders after creation
- Deploy on custom domain

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

 
