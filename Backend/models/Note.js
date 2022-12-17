const mongoose = require('mongoose');
const {Schema} = mongoose;

const notesSchema = new Schema({
    // here we are linking this collection with the 'user' collection to make sure that notes are accessible of the logged in user only(it's very similar to foreign key concept)
    user:{ // this is refering to the unique userId
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('notes',notesSchema);