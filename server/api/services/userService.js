const User = require("../models/user");
const danceNoteService = require("../services/danceNoteService");

exports.getUser = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw err;
    }
};

exports.saveUser = async (username, categories) => {
    try {
        const user = new User({
            username: username,
            categories: categories,
        });
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

const propagateCategoryDeletion = async (oldCategories, newCategories) => {
    var hashTable = new Object();

    for (const category of newCategories) {
        hashTable[category] = true;
    }

    let deletedCategory = "";

    for (const category of oldCategories) {
        if (!hashTable.hasOwnProperty(category)) {
            deletedCategory = category;
            break;
        }
    }

    const danceNotes = await danceNoteService.getDanceNotesByCategory(
        deletedCategory
    );

    for (const danceNote of danceNotes) {
        danceNote.category = "Other";
        danceNote.save();
    }
};

const propagateCategoryEdit = async (oldCategories, newCategories) => {
    var hashTable = new Object();

    for (const category of newCategories) {
        hashTable[category] = false;
    }

    let oldCategory = "";
    let newCategory = "";

    for (const category of oldCategories) {
        if (hashTable.hasOwnProperty(category)) {
            hashTable[category] = true;
        } else {
            oldCategory = category;
        }
    }

    for (const key in hashTable) {
        if (!hashTable[key]) {
            newCategory = key;
        }
    }

    const danceNotes = await danceNoteService.getDanceNotesByCategory(
        oldCategory
    );

    for (const danceNote of danceNotes) {
        danceNote.category = newCategory;
        danceNote.save();
    }
};

exports.updateUser = async (id, username, categories) => {
    try {
        const user = await this.getUser(id);

        user.username = username !== undefined ? username : user.username;

        if (categories.length < user.categories.length) {
            propagateCategoryDeletion(user.categories, categories);
        } else {
            propagateCategoryEdit(user.categories, categories);
        }

        user.categories =
            categories !== undefined ? categories : user.categories;

        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};
