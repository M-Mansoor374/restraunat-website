# TR Project

A full-stack restaurant management application with sales tracking.

## 📁 Project Structure

```
tr/
├── frontend/          # React + Vite frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
└── backend/          # Node.js + Express + MongoDB backend
    ├── config/       # Configuration files
    ├── models/       # MongoDB models
    ├── controllers/  # Business logic
    ├── routes/       # API routes
    └── server.js     # Backend server entry point
```

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173` (or similar port)

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=mongodb://127.0.0.1:27017/tr
# PORT=5000

npm start
```

Backend will run on `http://localhost:5000`

## 📚 Documentation

- **Backend Setup Guide**: See `backend/BACKEND_SETUP_GUIDE.md`
- **API Endpoints**: 
  - `POST /api/sales` - Create a new sale
  - `GET /api/sales/weekly` - Get weekly sales totals
  - `GET /api/sales/monthly` - Get monthly sales totals

## 🔧 Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- The frontend and backend run on separate ports
- Backend must be running to save sales data from the frontend

