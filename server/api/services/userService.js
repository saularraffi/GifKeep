const User = require("../models/users")

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

exports.updateUser = async (id, username, categories) => {
    try {
        const user = await this.getUser(id);

        user.username = username !== undefined ? username : user.username;
        user.categories = categories !== undefined ? categories : user.categories;  

        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}