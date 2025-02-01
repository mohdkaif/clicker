const User = require('../models/User');

const createUser = async () => {
    const newUser = new User();
    await newUser.save();
    return newUser;
};

const findUserById = async (userId) => {
    return await User.findById(userId);
};

const updateUser = async (userId, reward) => {
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    user.counter += 1; 
    user.score += reward.points; 
    if (reward.prize) user.prizes += 1; 

    await user.save(); 
    return user;
};

module.exports = { createUser, findUserById, updateUser };
