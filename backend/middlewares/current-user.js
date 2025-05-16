import jwt from "jsonwebtoken";
import NotAuthorizedError from "../errors/not-authorized.js";

const currentUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            req.currentUser = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw  new NotAuthorizedError();
        }
    } else {
        throw  new NotAuthorizedError();
    }
    next();
};

export default currentUser;