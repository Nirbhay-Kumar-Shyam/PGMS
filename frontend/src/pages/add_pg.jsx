import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
const Add_pg = () => {
    // const location = useLocation();
    const [formData, setFormData] = useState({
        pg_name: ""
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
        if (!formData.pg_name) {
          setError("Please fill out all fields.");
          return;
        }
        await axios.post(`http://127.0.0.1:5000/pg_name`, formData);

        console.log("Form submitted:", formData);
      };
    
      const handleReset = () => {
        setFormData({
          pg_name: "",
        });
        setError("");
      };
    return (
        <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="pg_name"
          value={formData.pg_name}
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

export default Add_pg;