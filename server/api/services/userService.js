const User = require("../models/users")
const gifNoteService = require("../services/gifNotesService")


exports.getUser = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw err;  
    }
}

exports.saveUser = async (username, categories) => {
    try {
        const user = new User({
            username: username,
            categories: categories
        });
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

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

    const gifNotes = await gifNoteService.getGifNotesByCategory(deletedCategory);

    for (const gifNote of gifNotes) {
        gifNote.category = "Other";
        gifNote.save();
    }
}

const propagateCategoryEdit = async (oldCategories, newCategories) => {
    var hashTable = new Object();
    
    for (const category of newCategories) {
        hashTable[category] = false;
    }

    let oldCategory = ""
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

    const gifNotes = await gifNoteService.getGifNotesByCategory(oldCategory);

    for (const gifNote of gifNotes) {
        gifNote.category = newCategory;
        gifNote.save();
    }
}

exports.updateUser = async (id, username, categories) => {
    try {
        const user = await this.getUser(id);

        user.username = username !== undefined ? username : user.username;

        if (categories.length < user.categories.length) {
            propagateCategoryDeletion(user.categories, categories);
        } else {
            propagateCategoryEdit(user.categories, categories);
        }

        user.categories = categories !== undefined ? categories : user.categories;  

        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}