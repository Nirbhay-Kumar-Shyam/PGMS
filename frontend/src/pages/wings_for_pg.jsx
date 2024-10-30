import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
function WingOfPG() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {}; // Access the data passed via state
  // data = Array.isArray(data) ? data : Object.entries(data || {});
  console.log("data:", data);
  console.log("dataType:", typeof data);
  const handleClick = async (wing_id) =>{
    try{

        const response = await axios.get(`http://localhost:5000/get_rooms/${wing_id}`);
        const fetchedData = response.data;

      // Navigate to the next page with fetched data
            navigate('/pg_room', { state: { data: fetchedData } });
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
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> Display the fetched data */}
        </div>
      ) : (
        <p>No data available.</p>
      )}

<div>
            <h1>Hello, Nirbhay</h1>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> Display fetched data */}

            <ul>
                {data.map(user => (
                    <li key={user.wing_id}>{user.wing_name}
                    <button
                    type="button"
                    onClick={()=>handleClick(user.wing_id)}
                    className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                >
                    <FaTrash className="mr-2" /> {user.wing_id}
                </button>
                    </li>
                    
                ))}
            </ul>
        </div>
    </div>

    
  );
}

export default WingOfPG;