import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/users/register", {
        name: name,
        email: email,
        password: password,
        role: role
      });
      alert("registered successfully");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
