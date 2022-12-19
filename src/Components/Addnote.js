import React,{useContext, useState} from 'react';
import noteContext from '../contexts/notes/noteContext';




const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;

    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        // this function prevents the page from reloading
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
    }

    const handleChange = (e)=>{ // this function will be called whenever we will write anything while adding or overwritting a note
        // Using spread operator, we will set the note to the newly entered value
        setNote({...note,[e.target.name]:[e.target.value]}) 
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} aria-describedby="emailHelp" required placeholder='your note title' />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="7" onChange={handleChange} required placeholder='write what you have in mind so that we can remind you'></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} placeholder='ex. personal...' />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
}

export default AddNote;