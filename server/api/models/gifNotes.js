const mongoose = require("mongoose")

const GifNote = mongoose.Schema({
    id: String,
    note: String,
    category: String,
    gifUrl: String
})

module.exports = mongoose.model("gifnote", GifNote)