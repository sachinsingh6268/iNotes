import React from 'react';
import AddNote from './Addnote';
import Notes from './Notes'

const Home = (props) => {
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <Notes showAlert={props.showAlert}/>
        </>
    );
}

export default Home;