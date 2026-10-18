import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) {
    user = JSON.parse(userStr);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("logged out");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Smart Campus Complaints</div>
      <div className="navbar-links">
        {!token && (
          <div>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </div>
        )}
        {token && user && user.role === "student" && (
          <div>
            <span className="nav-user">Welcome, {user.name} (Student)</span>
            <Link to="/student-dashboard" className="nav-link">My Complaints</Link>
            <Link to="/new-complaint" className="nav-link">New Complaint</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}
        {token && user && user.role === "admin" && (
          <div>
            <span className="nav-user">Welcome, {user.name} (Admin)</span>
            <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
