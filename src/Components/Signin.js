import React from 'react';

const SignIn = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder='email@gmail.com' name="email" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder='Password' name='password' id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    );
}

export default SignIn;