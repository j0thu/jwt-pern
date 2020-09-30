import React, { Fragment, useState } from 'react';

const Register = ()=>{
    return (
        <Fragment>
            <h1>Register</h1>
            <form action="">
                <input type="text" name ="name" placeholder="Name" className="form-control my-3"/>
                <input type="email" name ="email" placeholder="e-mail" className="form-control my-3"/>
                <input type="password" name ="password" placeholder="password" className="form-control my-3"/>
                <button className="btn btn-success btn-block">Register</button>
            </form>
        </Fragment>
    )
}

export default Register;