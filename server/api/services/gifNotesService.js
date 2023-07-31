const GifNote = require("../models/gifNotes")

exports.getGifNotes = async () => {
    try {
        const gifNotes = await GifNote.find();
        return gifNotes;
    } catch (error) {
        return err;  
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