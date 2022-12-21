import React from 'react';

const Alert = (props) => {
    function capitalize(word) {
        if(word === "danger"){
            word = 'error';
        } else if(word === 'secondary'){
            word = 'empty'
        }
        return word[0].toUpperCase() + word.slice(1,);
    }
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <span className="alert-heading">{capitalize(props.alert.type)}&nbsp;:&nbsp;{props.alert.message}</span>
            </div>}
        </div>
    );
}

export default Alert;
