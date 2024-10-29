import React, {useState, useEffect} from 'react';

const Rooms = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
    fetch('http://127.0.0.1:5000/get_rooms')
    .then((response)=>{
        if(!response.ok)
        {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data)=>{
        setData(data);
        setLoading(false);
    })
    .catch((error)=>{
        setError(error);
        setLoading(false);
    });

    }, []);
    if(loading)
    {
        return <div>Loading...</div>;
    }
    if(error)
    {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h1>Hello, Nirbhay</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
        </div>
    );
};

export default Rooms;