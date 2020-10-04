import React, { Fragment, useState, useEffect } from 'react';

const Dashboard = ({setAuth})=>{
    
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method:"GET",
                headers:{token:localStorage.token}, //we are setting the token to the header
            })
            const parseResponse = await response.json();
            // console.log(parseResponse); -> will give you the user_name in the console.
            setName(parseResponse.user_name); //setting the user_name received in the console to the state
        }
        catch (err) {
            console.error(err.message);
        }
    }

    function logout(e){
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
    }


    useEffect(()=>{
        getName();
    }, []);

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <h3>Hello {name}</h3>
            <button className="btn btn-info" onClick={e=>logout(e)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard;