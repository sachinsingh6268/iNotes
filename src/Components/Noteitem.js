import React, { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const {note, updateNote} = props;


    // const { title, description, tag, _id } = props.note
    return (
        <div className="card my-3 col-md-3 mx-1">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-1 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>

                {/* we can pass arguement in a fn like "onClick={()=>{deleteNote(note._id)}}" */}
                <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id) }} ></i>
                <i className="fa-solid fa-file-pen mx-3" onClick={()=>{updateNote(note)}}></i>


            </div>
        </div>
    );
}

export default Noteitem;