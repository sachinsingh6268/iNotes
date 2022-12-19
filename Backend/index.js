const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = 4000;

// console.log(process.env.JWT_TOKEN)

const connectToMongo = require('./db');

// fixing cors error
app.use(cors());

connectToMongo();
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log("Server has been started Successfully!!")
})