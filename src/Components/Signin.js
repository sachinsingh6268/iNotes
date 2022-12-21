import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })

            const json = await response.json();
            // console.log(json);
            if (json.success) {
                // save the auth-token and redirect
                localStorage.setItem('token', json.jwtToken);
                navigate('/');
                props.showAlert('success', 'Welcome!!!, You are signed In')


            } else {
                props.showAlert('warning', 'Sorry, Please Enter Correct Credentials')
            }
        } catch (error) {
            props.showAlert('danger', 'Some error occured, Please Try sometime later')
        }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Welcome back!! Sign In to contiune</h2>
            <form onSubmit={handleSignIn} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder='email@gmail.com' required value={credentials.email} onChange={handleChange} name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Password' required minLength={7} value={credentials.password} onChange={handleChange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;