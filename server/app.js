const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const config = require('./config')

// requiring routes
const gifNotes = require("./api/controllers/gifNotesController")

require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// using routes in app
app.use(gifNotes)

mongoose.connect(config.db.connectionString, config.db.options)
.then(() => {
    console.log("\n[+] MongoDB connection successful")
    
    app.listen(config.app.port, config.app.host, () => {
        console.log(`\n[+] Server running at http://${config.app.host}:${config.app.port}/`);
    });    
})
.catch((err) => {
    console.log("\n[-] MongoDB connection failed\n")
    // console.log(err)
})