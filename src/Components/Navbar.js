import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    let navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/signin');
    }

    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`nav-item ${location.pathname === '/' ? "active" : ""}`}>
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/about' ? "active" : ""}`}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    {localStorage.getItem('token') ? <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" onClick={handleLogout} >Logout</button>
                    </div> : <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" to="/signin">SignIn</button>
                        <Link className="btn btn-primary" to="/signup" >SignUp</Link>
                        {/* <span>{details.name} &nbsp;&nbsp; {details.email}</span>  */}
                    </div>}
                </div>
            </div>
        </nav>
    );
}


export default Navbar;