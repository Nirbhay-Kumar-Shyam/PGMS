import React, {useEffect, useState} from "react";

const PG_member = () =>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/pg_list')
        .then((response)=>{
            if(!response.ok)
            {
                throw new Error("Network response was not ok");
            }
            return response.json()
        })
        .then((data)=>{
            setData(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error);
            setLoading(false);
        });
    });

    if(loading){
        return <div>loading...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h1>Hello, Nirbhay</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
        </div>
    );
};

export default PG_member;