import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
function PgRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {}; // Access the data passed via state
    console.log(data);
    console.log("Type of data:", typeof data);
  const handleClick = async (room_number) =>{
    try{

        const response = await axios.get(`http://localhost:5000/get_member/${room_number}`);
        const fetchedData = response.data;
        console.log(fetchedData);
        console.log("Type of data:", typeof fetchedData);
      // Navigate to the next page with fetched data
          navigate('/room_member', { state: { data: fetchedData } });
          console.log('Rule added:', response.data);

    } catch(error)
    {
        console.error('Error adding rule:', error);
    }
  }
  return (
    <div>
      <h1>Next Page</h1>
      {data ? (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
        </div>
      ) : (
        <p>No data available.</p>
      )}

<div>
            <h1>Hello, Nirbhay</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}

            <ul>
                {data.map(user => (
                    <li key={user.room_number}>{user.room_number}
                    <button
                    type="button"
                    onClick={()=>handleClick(user.room_number)}
                    className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                >
                    <FaTrash className="mr-2" /> {user.room_number}
                </button>
                    </li>
                    
                ))}
            </ul>
        </div>
    </div>

    
  );
}

export default PgRoom;