const express = require('express');
  
const app = express();
const PORT = 3000;


// to read request body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CORS entry check, only urls below are allowed
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8080'
}));









const createRouter = require("./routes/create/create.js")
app.use('/create',createRouter)

const retrieveRouter = require("./routes/retrieve/retrieve.js")
app.use('/retrieve',retrieveRouter)

const updateRouter = require("./routes/update/update")
app.use('/update',updateRouter)

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);