import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const getComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/complaints/my", {
        headers: {
          Authorization: token
        }
      });
      console.log(res.data);
      setComplaints(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("something went wrong");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role === "admin") {
      navigate("/admin-dashboard");
      return;
    }

    getComplaints();

    const interval = setInterval(() => {
      getComplaints();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (status) => {
    if (status === "Pending") {
      return "status-pending";
    }
    if (status === "In Progress") {
      return "status-progress";
    }
    if (status === "Resolved") {
      return "status-resolved";
    }
    return "";
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>My Complaints</h2>
        <div>
          <button onClick={getComplaints} className="btn" style={{ marginRight: "10px" }}>Refresh</button>
          <Link to="/new-complaint">
            <button className="btn">New Complaint</button>
          </Link>
        </div>
      </div>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Image</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>
                  <span className={getStatusClass(item.status)}>{item.status}</span>
                </td>
                <td>{item.assignedTo ? item.assignedTo : "Not assigned yet"}</td>
                <td>
                  {item.image ? (
                    <a href={"http://localhost:5001/uploads/" + item.image} target="_blank" rel="noreferrer">
                      View Image
                    </a>
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentDashboard;
