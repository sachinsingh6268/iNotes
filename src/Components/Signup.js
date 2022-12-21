import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:4000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: userDetails.name, email: userDetails.email, password: userDetails.password })
            })

            const json = await response.json();
            console.log(json);
            setUserDetails({ name: "", email: "", password: "" })
            if (json.success) {
                navigate('/signin')
                props.showAlert('success', "Account has been created Successfully, Enter details to signIn")

            } else {
                props.showAlert('warning', "Account with this email already exists, Please try with other email")
            }
        } catch (error) {
            props.showAlert('danger', "Some error occured, Please try again sometime later")
        }
    }

    function handleChange(e) {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Be the first to create an iNote account</h2>
            <form onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter Name' minLength={4} required value={userDetails.name} onChange={handleChange} name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder='Enter valid Email' required value={userDetails.email} onChange={handleChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Password' minLength={7} required value={userDetails.password} onChange={handleChange} name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder='Confirm Password' minLength={7} required value={userDetails.cpassword} onChange={handleChange} name='cpassword' id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;