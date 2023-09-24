const mongoose = require("mongoose");

const DanceNote = mongoose.Schema({
    id: String,
    note: String,
    category: String,
});

module.exports = mongoose.model("danceNote", DanceNote);
