import { CustomError }  from "../errors/custom-error.js";

export const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(500).send({
        errors: [
            { message: 'Something went wrong!' }
        ]
    });
};
