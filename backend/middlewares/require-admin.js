import { ForbiddenError } from '../errors/forbidden-error.js';

export const requireAdmin = (req, res, next) => {
    if (!req.currentUser || req.currentUser.role !== 'admin') {
        throw new ForbiddenError('Access denied: Admins only.');
    }
    next();
}

