# apnaCart 🛒

A full-stack MERN e-commerce application with cookie-based JWT authentication, OTP email verification, role-based access control, and a Redux-powered shopping experience.

---

## ✨ Features

- **Authentication & Authorization**
  - Secure cookie-based JWT auth (httpOnly cookies — no tokens in localStorage)
  - OTP email verification on registration (via Nodemailer)
  - Role-based access control (user / admin)
- **Products**
  - Full CRUD for products with image uploads (Multer + Cloudinary)
  - Category and product browsing
- **Cart & Orders**
  - Redux-managed cart with localStorage persistence for guest users
  - Order placement and order history
- **Admin**
  - Admin-only routes and dashboard for managing products, orders, and users

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Redux Toolkit
- Tailwind CSS v4
- Toastify
- Axios (layered `api/` → thunk architecture)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Multer + Cloudinary (image uploads)
- Nodemailer (OTP email verification)
- Cookie-based JWT authentication

---

## 📁 Project Structure

```
apnaCart/
├── backend/
│   ├── controllers/       # Product, Order, User/Auth controllers
│   ├── models/
│   ├── routes/
│   ├── middleware/        # auth, role-based access, error handling
│   └── utils/
│
└── frontend/
    └── src/
        ├── api/            # axios call functions, grouped by domain
        ├── app/
        │   └── store.js
        ├── features/
        │   ├── auth/
        │   ├── products/
        │   ├── cart/
        │   ├── orders/
        │   ├── user/
        │   └── admin/
        ├── hooks/          # useAuth.js, useCart.js
        ├── components/
        │   ├── layout/     # Navbar, Footer, Layout
        │   └── common/     # Input, Button, etc.
        ├── utils/          # axiosInstance.js, localStorage.js
        └── routes/
            └── AppRoutes.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas)
- Cloudinary account 
- SMTP credentials (Nodemailer)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers → OTP sent via email (Nodemailer)
2. User verifies OTP → account activated, JWT set as httpOnly cookie
3. Subsequent requests include the cookie automatically (`withCredentials: true`)
4. Protected/admin routes are guarded by middleware that checks the JWT and user role

---

## 🎨 Design

- Brand accent color: `#D85A30` (coral-orange)

---

## 📌 Status

Backend: ✅ Complete
Frontend: 🚧 In progress

---

## 📄 License

This project is for personal/portfolio use.