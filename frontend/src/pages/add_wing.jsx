import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
const Add_wing = () => {
    // const location = useLocation();
    const [formData, setFormData] = useState({
        wing_name: ""
      });
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        setError("");
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.wing_name) {
          setError("Please fill out all fields.");
          return;
        }
        await axios.post(`http://127.0.0.1:5000/wing_name`, formData);

        console.log("Form submitted:", formData);
      };
    
      const handleReset = () => {
        setFormData({
          wing_name: "",
        });
        setError("");
      };
    return (
        <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="wing_name"
          value={formData.wing_name}
          onChange={handleChange}
        />
      </div>


      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default Add_wing;