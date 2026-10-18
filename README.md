# Smart Campus Complaint Management System

A full stack web application where college students can register complaints (hostel, Wi-Fi, maintenance, etc.) with optional image proof, track the status in real time, and administrators can assign staff members and update the complaint status.

## Features

### Student
- Register and login with role selection
- Submit a complaint with title, category, description, and optional photo
- "My Complaints" page showing all complaints with status badges (Pending, In Progress, Resolved)
- Auto-refreshes every 10 seconds and has a manual Refresh button
- Protected routes so logged-out users cannot access the dashboard

### Admin
- Admin dashboard displaying all student complaints in a table
- Filter complaints by status (All, Pending, In Progress, Resolved)
- View submitted complaint images
- Assign staff members to complaints by typing their name
- Change complaint status to In Progress or Resolved

## Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Plain CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) and bcryptjs for password hashing
- **File Upload**: Multer

## Project Folder Structure

```text
Claude/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── complaintRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── NewComplaint.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## How to Run Locally in VS Code

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v16 or higher).
2. Install and start [MongoDB](https://www.mongodb.com/try/download/community) locally on port 27017 (or use MongoDB Atlas).

---

### Step 1: Open the Project in VS Code
1. Open **VS Code**.
2. Click **File** > **Open Folder...** and select this project folder.

---

### Step 2: Start the Backend Server
1. In VS Code, open a new terminal (**Terminal** > **New Terminal**).
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies (if running for the first time):
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```
   You should see:
   ```text
   connected to mongodb
   server running on port 5001
   ```

---

### Step 3: Start the Frontend
1. Open a second terminal tab in VS Code (click the **+** or **Split Terminal** button in the terminal window).
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies (if running for the first time):
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
   You will see:
   ```text
   VITE ready in ... ms
   ➜  Local:   http://localhost:5173/
   ```

---

### Step 4: Open in Browser & Test
1. Open `http://localhost:5173` in your browser.
2. Click **Register** and create a student account (Role: `student`).
3. Login and click **New Complaint** to file a complaint with an optional image.
4. Logout and register an admin account (Role: `admin`).
5. In the **Admin Dashboard**, view the complaint, assign staff, and change status to `In Progress` or `Resolved`.
6. Switch back to student account to see the live status update on **My Complaints**.
