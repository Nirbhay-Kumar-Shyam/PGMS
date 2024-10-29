import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
function RoomMember() {
  const location = useLocation();
//   const navigate = useNavigate();
  const { data } = location.state || {}; // Access the data passed via state

  const handleClick = async (wing_name) =>{
    try{

        const response = await axios.get(`http://localhost:5000/get_rooms/${wing_name}`);
        const fetchedData = response.data;

      // Navigate to the next page with fetched data
            // navigate('/pg_room', { state: { data: fetchedData } });
          console.log('Rule added:', response.data);

    } catch(error)
    {
        console.error('Error adding rule:', error);
    }
  }
  return (
    <div>
      <h1>Hello Nirbhay</h1>
      {data ? (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
        </div>
      ) : (
        <p>No data available.</p>
      )}


    </div>

    
  );
}

export default RoomMember;