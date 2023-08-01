const GifNote = require("../models/gifNotes")

exports.getGifNotes = async () => {
    try {
        const gifNotes = await GifNote.find();
        return gifNotes;
    } catch (error) {
        throw err;  
    }
}

exports.saveGifNote = async (note, category, gifUrl) => {
    try {
        const gifNote = new GifNote({
            note: note,
            category: category,
            gifUrl: gifUrl
        });
        const savedGifNote = await gifNote.save();
        return savedGifNote;
    } catch (error) {
        throw error;
    }
}

exports.deleteGifNote = async (id) => {
    try {
        const response = await GifNote.deleteOne({ _id: id });
        return response;
    } catch (error) {
        throw error;
    }
}