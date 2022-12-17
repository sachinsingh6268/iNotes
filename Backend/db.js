const mongoURI = "mongodb://localhost:27017/iNotebooks"
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Mongodb has been connected Successfully!!");
    })
}

module.exports = connectToMongo;