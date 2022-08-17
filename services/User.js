const User = require('../models/User');

const countUsers = async () => {
    return await User.countDocuments({});
}

const getUserByName = (firstName, lastName) => {
    return User.find({'firstName': firstName, 'lastName': lastName});
}

const getUserByEmail = (email) => {
    return User.find({'email': email});
}

const updateUser = (email, body) => {
    const user = getUserByEmail(email);
    if (!user.length)
        return null;

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.isAdmin = body.isAdmin;

    user.save();
    return user;
};

const deleteUser = async (email) => {
    return await User.findOneAndDelete({'email': email});
}

module.exports = {
    countUsers,
    getUserByName,
    getUserByEmail,
    updateUser,
    deleteUser,
}
