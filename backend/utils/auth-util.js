import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
            userName: user.userName
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (plain, hashed) => {
    return await bcrypt.compare(plain, hashed);
};

