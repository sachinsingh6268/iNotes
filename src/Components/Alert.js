import React from 'react';

const Alert = (props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <p>{props.message}</p>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export default Alert;
