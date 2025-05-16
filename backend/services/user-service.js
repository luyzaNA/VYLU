import User from '../models/User.js';


export const findUserByEmail = async (email) => {
    return User.findOne({email});
};

export const findUserByUserName = async (userName) => {
    return User.findOne({userName});
};

export const findUserById = async (id) => {
    return User.findById(id);
};

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const getUserWithProfiles = async (id) => {
    return User.findById(id).populate('profiles');
};

