const mongoose = require("mongoose")

const User = mongoose.Schema({
    id: String,
    username: String,
    categories: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("user", User)