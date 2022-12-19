import React, { useContext, useEffect } from 'react';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getAllNotes } = context;
    
    useEffect(() => {
        getAllNotes();
       // eslint-disable-next-line
    },[])

    return (
        <div className='row'>
            <h1 className='my-3'>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    );
}

export default Notes;