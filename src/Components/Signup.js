import React from 'react';

const SignUp = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" placeholder='Enter Name' name="name" id="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" placeholder='Enter valid Email' id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder='Password' name='password' id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
}

export default SignUp;