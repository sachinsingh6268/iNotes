import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getAllNotes, editNote } = context;
    const navigate = useNavigate();

    // we are 
    const [note, setNote] = useState({ id: "", utitle: "", udescription: "", utag: "" })

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();

        }else{
            navigate('/signin');
        }
    }, [])

    const showModal = useRef(null);
    const closeModal = useRef(null);

    const updateNote = (currentNote) => {
        showModal.current.click();
        setNote({ id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag });
    }

    function handleChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    function handleClick(e) {
        e.preventDefault();
        editNote(note.id, note.utitle, note.udescription, note.utag);
        closeModal.current.click();
        props.showAlert('success', 'Note has been updated!!')

    }

    return (
        <>

            <button ref={showModal} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="utitle" className="form-label">Note Title</label>
                                    <input type="text" className="form-control" id="utitle" name="utitle" minLength={5} required value={note.utitle} onChange={handleChange} aria-describedby="emailHelp" placeholder='your note title' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="udescription">Description</label>
                                    <textarea className="form-control" id="udescription" name="udescription" minLength={5} required value={note.udescription} rows="7" onChange={handleChange} placeholder='write what you have in mind so that we can remind you'></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="utag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="utag" name='utag' value={note.utag} onChange={handleChange} placeholder='ex. personal...' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.udescription.length < 5 || note.utitle.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row'>
                <h1 className='my-3'>Your Notes</h1>
                <div className="mx-2">
                    {notes.length === 0 ? "No notes, add some notes so that we can remember something for you" : ""}
                </div>

                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    );
}

export default Notes;