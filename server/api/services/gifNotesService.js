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


exports.updateGifNote = async (id, note, category, gifUrl) => {
    try {
        let updatedFields = {};

        if (note !== undefined) { updatedFields.note = note };
        if (category !== undefined) { updatedFields.category = category };
        if (gifUrl !== undefined) { updatedFields.gifUrl = gifUrl };

        const updatedGifNote = await GifNote.findOneAndUpdate({ _id: id }, updatedFields);
        return updatedGifNote;
    } catch (error) {
        throw error;
    }
}