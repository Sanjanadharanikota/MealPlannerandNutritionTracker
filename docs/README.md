# MealPlanner & Nutrition Tracker

A full-stack web application for planning meals, tracking nutrition, and managing shopping lists. Built with Node.js, Express, MongoDB, and a modern HTML/Bootstrap frontend.

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Security Notes](#security-notes)
- [License](#license)

---

## Features
- User registration, login, and profile management (JWT authentication)
- Plan daily meals and track calories, protein, carbs, and fats
- Analyze foods using the Nutritionix API
- Manage a shopping list linked to your meals
- Dashboard with stats and nutrition chart
- Responsive UI with Bootstrap

## Screenshots
Please refer to the FSD.pdf document located in the Documents folder, pages 70 to 75, for detailed screenshots and UI designs of the dashboard, meal planner, nutrition tracker, shopping list, and other key features.

## Tech Stack
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript, Chart.js
- **Backend:** Node.js, Express.js, Mongoose (MongoDB), JWT, bcrypt, dotenv, axios
- **Database:** MongoDB

## Project Structure
```
MealPlanner/
│
├── backend/
│   ├── models/          # Mongoose models (Meal, User, ShoppingItem)
│   ├── routes/          # Express route handlers (meals, users, shopping-list)
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main Express server
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables (DO NOT COMMIT)
│
├── images/              # Static images for frontend
├── *.html               # Frontend pages (dashboard, login, register, etc.)
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see [Environment Variables](#environment-variables))
4. Start the server:
   ```bash
   npm run dev
   # or
   npm start
   ```

### Frontend Setup
- Open `dashboard.html` or other HTML files in your browser.
- For full functionality, serve the frontend using a static server or from Express (`express.static('../')` is already set up).

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT
- `GET /profile` — Get user profile (auth)
- `PUT /profile` — Update user profile (auth)
- `GET /stats` — Get user stats (auth)

### Meal Routes (`/api/meals`)
- `GET /` — Get all meals (auth)
- `POST /` — Add a new meal (auth)
- `PUT /:id` — Update a meal by ID (auth)
- `DELETE /:id` — Delete a meal by ID (auth)
- `POST /analyze-food` — Analyze food using Nutritionix API (auth)

### Shopping List Routes (`/api/shopping-list`)
- `GET /` — Get all shopping items (auth)
- `POST /` — Add a new item (auth)
- `PATCH /:id` — Update an item by ID (auth)
- `DELETE /:id` — Delete an item by ID (auth)

## Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```
MONGODB_URI=mongodb://localhost:27017/nutrient-tracker
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
NUTRITIONIX_APP_ID=your-nutritionix-app-id
NUTRITIONIX_APP_KEY=your-nutritionix-app-key
```
*Never commit `.env` to your repository!*

## Security Notes
- **.env** must not be committed (add to `.gitignore`)
- Change `JWT_SECRET` before deploying to production
- Use strong passwords for user accounts
- Nutritionix API credentials are required for food analysis

## License
This project is for personal/non-commercial use.

---


