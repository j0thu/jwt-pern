import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Register = ({setAuth})=>{

    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name, email, password} = inputs;

    const onChange = (e)=>{
        setInputs({...inputs, [e.target.name]:e.target.value});
    }

    const onSubmitForm = async(e)=>{ //on submit, after insertion of data in the db, you will receive a token
        e.preventDefault();
        try {
            const body = {name, email, password}
            const response = await fetch("http://localhost:5000/auth/register", {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
        const parseResponse = await response.json();
        localStorage.setItem("token", parseResponse.token); //setting the token to localstorage
        setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="my-3">Register</h1>
            <form action="" onSubmit = {onSubmitForm}>
                <input type="text" name ="name" placeholder="Name" className="form-control my-3 w-50" value={name} onChange={e=>onChange(e)}/>
                <input type="email" name ="email" placeholder="E-mail" className="form-control my-3 w-50" value={email} onChange={e=>onChange(e)}/>
                <input type="password" name ="password" placeholder="Password" className="form-control my-3 w-50" value={password} onChange={e=>onChange(e)}/>
                <button className="btn btn-success btn-block w-50">Register</button>
            </form>
            <Link to='/login'>Login</Link>
        </Fragment>
    )
}

export default Register;