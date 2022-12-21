const express = require('express');
const router = express.Router();
const getUser = require('../middlewares/getUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')


// ROUTE 1 -- Fetch all the notes corresponding to a logged in user using GET 'api/notes/getallnotes', Login required
router.get('/getallnotes', getUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    if (!notes) {
        res.status(404).send("No Notes found!!")
    }

    try {
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE -- 2 Add a note to the user that is logged in using POST 'api/notes/addnote', Login required
router.post('/addnote', getUser, [
    body('title').isLength({ min: 4 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
    }

    try {
        const { title, description, tag } = req.body // using concept of destructuring
        const note = new Note({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })

        // after creating the note, we will save it 
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE -- 3 , Updating the existing note(for a logged in user) using PUT '/api/notes/updatenote', Login required

router.put('/updatenote/:id', getUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // will create a new note for the purpose of updation of existing note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // finding the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // console.log(note.user.id);
        // console.log(note.user.toString());
        // console.log(req.user.id);

        // checking whether the id of the user in the note and the id of the user returned by middleware are same or not, if not same we will not allow to make any modifications
        if (note.user.toString() !== req.user.id) {  // why we need here to stringify "note.user" to get the id
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // note.save();
        res.json(note);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})



// ROUTE -- 4 Delete a note for a logged in user using DELETE '/api/notes/deletenote/:id', Login required (Update and delete are very much similar)
router.delete('/deletenote/:id', getUser, async (req, res) => {

    try {
        // find the note to be deleted and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if it is notes of the logged in user(only if user owns it)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // this will return the note that has been deleted
        note = await Note.findByIdAndRemove(req.params.id);
        res.json({ "success": "Note has been deleted Successfully", note: note });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router