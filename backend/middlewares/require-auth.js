import NotAuthorizedError from "../errors/not-authorized.js";

export const requireAuth = (req, res, next) => {
    if(!req.currentUser){
        throw new NotAuthorizedError('Unauthorized access: user is not authenticated.');
    }
    next();
}

export default requireAuth;