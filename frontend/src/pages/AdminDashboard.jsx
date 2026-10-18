import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const getComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/complaints/all", {
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
    if (user.role !== "admin") {
      navigate("/student-dashboard");
      return;
    }

    getComplaints();
  }, []);

  const handleAssignChange = (id, value) => {
    const updated = complaints.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          assignedTo: value
        };
      }
      return item;
    });
    setComplaints(updated);
  };

  const handleStatusChange = (id, value) => {
    const updated = complaints.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          status: value
        };
      }
      return item;
    });
    setComplaints(updated);
  };

  const updateComplaint = async (id, status, assignedTo) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5001/api/complaints/" + id, {
        status: status,
        assignedTo: assignedTo
      }, {
        headers: {
          Authorization: token
        }
      });
      alert("status updated");
      getComplaints();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("something went wrong");
      }
    }
  };

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

  let filteredComplaints = complaints;
  if (filterStatus !== "All") {
    filteredComplaints = complaints.filter((item) => item.status === filterStatus);
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Status:</label>
          <select
            className="input"
            style={{ width: "150px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Image</th>
              <th>Assigned To</th>
              <th>Change Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((item) => (
              <tr key={item._id}>
                <td>{item.user && item.user.name ? item.user.name : "Unknown"}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <span className={getStatusClass(item.status)}>{item.status}</span>
                </td>
                <td>
                  {item.image ? (
                    <a href={"http://localhost:5001/uploads/" + item.image} target="_blank" rel="noreferrer">
                      View Image
                    </a>
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    className="input"
                    value={item.assignedTo || ""}
                    placeholder="Staff name"
                    onChange={(e) => handleAssignChange(item._id, e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="input"
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => updateComplaint(item._id, item.status, item.assignedTo)}
                    className="btn"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
