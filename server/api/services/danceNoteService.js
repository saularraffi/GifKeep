const DanceNote = require("../models/danceNote");

exports.getDanceNotes = async () => {
    try {
        const danceNotes = await DanceNote.find();
        return danceNotes;
    } catch (error) {
        throw error;
    }
};

exports.getDanceNotesByCategory = async (category) => {
    try {
        const danceNotes = await DanceNote.find({ category: category }).exec();
        return danceNotes;
    } catch (error) {
        throw error;
    }
};

exports.saveDanceNote = async (note, category) => {
    try {
        const danceNote = new DanceNote({
            note: note,
            category: category,
        });
        const savedDanceNote = await danceNote.save();
        return savedDanceNote;
    } catch (error) {
        throw error;
    }
};

exports.deleteDanceNote = async (id) => {
    try {
        const response = await DanceNote.deleteOne({ _id: id });
        return response;
    } catch (error) {
        throw error;
    }
};

exports.updateDanceNote = async (id, note, category) => {
    try {
        let updatedFields = {};

        if (note !== undefined) {
            updatedFields.note = note;
        }
        if (category !== undefined) {
            updatedFields.category = category;
        }

        const updatedDanceNote = await DanceNote.findOneAndUpdate(
            { _id: id },
            updatedFields
        );
        return updatedDanceNote;
    } catch (error) {
        throw error;
    }
};
