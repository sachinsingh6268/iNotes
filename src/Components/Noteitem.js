import React, { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context;

    const { title, description, tag,_id } = props.note
    return (
        <div className="card my-3 col-md-3 mx-1">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-1 text-muted">{tag}</h6>
                <p className="card-text">{description}</p>
                
                {/* we can pass arguement in a fn like "onClick={()=>{deleteNote(note._id)}}" */}
                <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(_id)}} ></i>
                <i className="fa-solid fa-file-pen mx-3" ></i>
                {/* onClick={editNote}
                */}
            </div>
        </div>
    );
}

export default Noteitem;