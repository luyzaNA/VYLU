import {CustomError} from "./custom-error.js";

export class ForbiddenError extends CustomError {
    constructor(message=" Access denied: Admins only.") {
        super(message);
        this.statusCode = 403;
    }
}
