import {CustomError} from "./custom-error.js";

export class NotAuthorizedError extends CustomError {
    constructor(message = 'Not Authorized') {
        super(message);
        this.statusCode=401;
    }
}

