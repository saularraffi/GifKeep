const mongoose = require("mongoose");

const DanceNote = mongoose.Schema({
    id: String,
    note: String,
    category: String,
    videoUrl: String,
});

module.exports = mongoose.model("danceNote", DanceNote);
