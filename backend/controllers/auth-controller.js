import {createUser, findUserByEmail, findUserByUserName} from '../services/user-service.js';
import {comparePasswords, generateToken, hashPassword} from "../utils/auth-util.js";
import {BadRequestError} from "../errors/bad-request.js";

export const register = async (req, res, next) => {
    const { email, password, userName, role } = req.body;

    try {
        const existingUserByEmail = await findUserByEmail(email);
        if (existingUserByEmail) {
            throw new BadRequestError('Email already in use');
        }

        const existingUserByUserName = await findUserByUserName(userName);
        if (existingUserByUserName) {
            throw new BadRequestError('Username already in use');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser({
            email,
            password: hashedPassword,
            userName,
            role
        });

        const token = generateToken(newUser);
        res.status(201).json({ token, user: {
                _id: newUser._id,
                email: newUser.email,
                userName: newUser.userName,
                role: newUser.role,
                userPicture: newUser.userPicture
            } });
        console.log('User registered successfully:', newUser);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new BadRequestError('Invalid email or password');
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            throw new BadRequestError('Invalid email or password');
        }

        const token = generateToken(user);
        res.status(200).json({

            token,
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                role: user.role,
                userPicture: user.userPicture
            }
        });

    } catch (err) {
        next(err);
    }
};