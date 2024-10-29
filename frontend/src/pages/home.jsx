import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace the URL with your actual API endpoint
        fetch('http://127.0.0.1:5000/pg_list')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency array means this will run only once after the component mounts

    const handleButton = async (pg_id) => {
        // Prepare the data to send with correct types
        
        const dataToSend = {
          
        };
    
        console.log('Data being sent:', dataToSend); // Log the data to verify
    
        try {
          const response = await axios.get(`http://localhost:5000/wings_list/${pg_id}`);
          const fetchedData = response.data;

      // Navigate to the next page with fetched data
            navigate('/wings_of_PG', { state: { data: fetchedData } });
          console.log('Rule added:', response.data);
        } catch (error) {
          console.error('Error adding rule:', error);
        }
      };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Hello, Nirbhay</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}

            <ul>
                {data.map(user => (
                    <li key={user.pg_id}>{user.pg_name}
                    <button
                    type="button"
                    onClick={()=>handleButton(user.pg_id)}
                    className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                >
                    <FaTrash className="mr-2" /> {user.pg_name}
                </button>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default Home;
