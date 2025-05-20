import { CustomError } from './custom-error.js';

export class DuplicateEntryError extends CustomError {
    constructor(message = 'Duplicate entry error') {
        super(message);
        this.statusCode = 409;
    }
}
