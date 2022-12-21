import React, { useState } from 'react';
import noteContext from './noteContext';



const NoteState = (props) => {
    const host = 'http://localhost:4000';

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes from the database using the API call
    const getAllNotes = async () => {

        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setNotes(json);
            if (json.length === 0) {
                props.showAlert('secondary', 'There are no notes to show, Add some notes')
            } else{
                props.showAlert('success','Your notes are shown below')
            }
        } catch (error) {
            props.showAlert('danger','Error while fetching the notes!!')
        }
    }




    // Add a note(for the logged in user)
    const addNote = async (title, description, tag) => {

        try {
            // API call to add a note in database(server side)
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                // how to write body other way ??
                body: JSON.stringify({ title, description, tag })
            })

            // first we will push the note(that we want to add) in the array of current notes then we will use the setNotes for setting the new state of the notes 
            const note = await response.json(); // this is the new node that we will add in our database
            // concat returns an array whereas push updates an array
            setNotes(notes.concat(note));
        } catch (error) {
            props.showAlert('danger','Some error occured while adding the note,Try sometime later!!')
        }
    }




    // Delete a note(for the logged in user)
    const deleteNote = async (id) => {
        // API call to delete the note in the database(in backend or in server side)
        try {

            await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }

            })

            // Logic to delete the note for the given id
            // will find the notes other than the note corresponding to the given id(passed as arguement) and put the other notes in a new array, and then we will set the state of the notes as resulted array
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            props.showAlert('success', 'Note has been deleted Successfully!!')
        } catch (error) {
            props.showAlert('danger', 'Some error occured, try sometime later!!')
        }
    }





    // Edit a note(for the logged in user)
    const editNote = async (id, title, description, tag) => {
        try {

            // API call to edit the note with the given id(in the backend or server side)
            await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')

                },
                body: JSON.stringify({ title, description, tag })
            });


            // logic to edit the note in client side(In front end)
            // In react we can't change the states directly, for changing we have to create a deep copy first as
            let newNotes = JSON.parse(JSON.stringify(notes));
            // Now we will make edits in this new copy, then we will do set the state of notes as newNotes
            for (let index = 0; index < newNotes.length; index++) {
                const newNote = newNotes[index];
                if (newNote._id === id) {
                    newNotes[index].title = title
                    newNotes[index].description = description
                    newNotes[index].tag = tag
                    break;
                }

            }
            setNotes(newNotes);
        } catch (error) {
            props.showAlert('danger','Some error occured while updating the note, try sometime later!!')
        }
    }


    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;