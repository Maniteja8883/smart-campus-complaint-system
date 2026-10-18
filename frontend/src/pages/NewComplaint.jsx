import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Hostel");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5001/api/complaints", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("complaint submitted");
      navigate("/student-dashboard");
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
        <h2>Submit Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Hostel">Hostel</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="input"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Image (Optional)</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default NewComplaint;
