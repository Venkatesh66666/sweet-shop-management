# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **React + TypeScript** (Frontend) and **Node.js + Express + TypeScript + SQLite** (Backend).  
The application supports **role-based authentication**, **admin-controlled inventory management**, and **user purchases**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based authentication
- Role-based access (`ADMIN`, `USER`)
- Protected routes

### 👤 User Features
- View available sweets
- Search sweets by name or category
- Purchase sweets (stock updates automatically)

### 🛠 Admin Features
- Add new sweets
- Edit sweet price and quantity
- Delete sweets
- Full inventory management

### 🎨 UI & UX
- Responsive dashboard layout
- Clean and intuitive interface
- Search functionality
- Conditional UI based on user role
- Navbar with logout functionality

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite
- JWT (jsonwebtoken)
- bcrypt

---

## 📁 Project Structure

sweet-shop-management/
│
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── sweets/
│ │ ├── inventory/
│ │ ├── middlewares/
│ │ ├── utils/
│ │ ├── config/
│ │ ├── routes.ts
│ │ ├── app.ts
│ │ └── server.ts
│ └── database.sqlite
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ └── vite.config.ts
│
└── README.md



---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev


Backend runs at:
http://localhost:5000

Health check:
GET /health


2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:
http://localhost:5173



🔑 User Roles
Role	Permissions
USER	View & buy sweets
ADMIN	Add, edit, delete sweets

Role is derived from JWT payload.



🔐 Authentication Flow

User registers
Logs in
JWT stored in localStorage
Role extracted from token
UI adapts based on role



📸 Application Flow

Login / Register
Dashboard (User / Admin)
Add / Edit / Delete sweets (Admin)
Search sweets
Purchase sweets



🧪 Testing

Backend APIs tested using Postman / Supertest
Frontend tested manually in browser



📌 Future Enhancements

Toast notifications
Order history
Role management panel
Deployment (Netlify + Render)
Automated testing



👨‍💻 Author
Venkatesh Choppadhandi