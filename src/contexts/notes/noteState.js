import React, { useState } from 'react';
import noteContext from './noteContext';



const NoteState = (props) => {
    const host = 'http://localhost:4000';


    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes from the database using the API call
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZWZiMWZiNzM1ODAyZTIyNGJlNjM5In0sImlhdCI6MTY3MTM2MzM1OX0.dsbYZADSkltp2KaxJ42IHqEtOQv8_ZhGSGWFRbSNLAM'
            }
        });
        const json = await response.json();
        console.log(json);
        // return json;
        setNotes(json);
    }




    // Add a note(for the logged in user)
    const addNote = async (title, description, tag) => {
        // API call to add a note in database(server side)
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZWZiMWZiNzM1ODAyZTIyNGJlNjM5In0sImlhdCI6MTY3MTM2MzM1OX0.dsbYZADSkltp2KaxJ42IHqEtOQv8_ZhGSGWFRbSNLAM'
            },
            body: {
                "title": title,
                "description": description,
                "tag": tag
            }
            // we can also write body tag by using "JSON.stringify(data)" as 
            // body:JSON.stringify({title,description,tag})
        })

        const json = await response.json();
        console.log(json);


        // first we will push the note(that we want to add) in the array of current notes then we will use the setNotes for setting the new state of the notes 
        const note = {
            "_id": "639efc6ed14681eaehjjh6d",
            "user": "639efb1fb735802e224be639",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-12-18T11:41:34.041Z",
            "__v": 0
        }
        // concat returns an array whereas push updates an array
        setNotes(notes.concat(note));
    }




    // Delete a note(for the logged in user)
    const deleteNote = async (id) => {
        // API call to delete the note in the database(in backend or in server side)
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZWZiMWZiNzM1ODAyZTIyNGJlNjM5In0sImlhdCI6MTY3MTM2MzM1OX0.dsbYZADSkltp2KaxJ42IHqEtOQv8_ZhGSGWFRbSNLAM'
            }

        })

        const json = await response.json();
        console.log(json)


        // Logic to delete the note for the given id
        console.log("deleting the note with id" + id)
        // will find the notes other than the note corresponding to the givne id(passed as arguement)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }




    // Edit a note(for the logged in user)
    const editNote = async (id, title, description, tag) => {
        // API call to edit the note with the given id(in the backend or server side)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZWZiMWZiNzM1ODAyZTIyNGJlNjM5In0sImlhdCI6MTY3MTM2MzM1OX0.dsbYZADSkltp2KaxJ42IHqEtOQv8_ZhGSGWFRbSNLAM'

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)


        // logic to edit the note in client side
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
                break;
            }

        }
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;