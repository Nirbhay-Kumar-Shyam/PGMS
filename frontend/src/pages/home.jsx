import React, { useEffect, useState } from 'react';

const Home = () => {
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
        </div>
    );
};

export default Home;
