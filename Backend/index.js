const express = require('express');
const app = express();
require('dotenv').config();
const port = 4000;

// console.log(process.env.JWT_TOKEN)

const connectToMongo = require('./db');

connectToMongo();
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log("Server has been started Successfully!!")
})