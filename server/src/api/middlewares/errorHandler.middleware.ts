import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../../utils/constants.js";
import { CustomError, ZodSchemaError } from "../../errors/index.error.js";

export const errorHandler = (
	error: unknown,
	req: Request<never, never, never, never>,
	res: Response,
	next: NextFunction
) => {
	console.log(`Catching error ${error}`);

	if (error instanceof CustomError) {
		res.status(error.statusCode).send({ message: error.message });
	} else if (error instanceof ZodSchemaError) {
		res.status(error.statusCode).send({
			name: error.name,
			error: error.errors
		});
	} else {
		res.status(StatusCodes.InternalServerError500).send({ error });
	}

	return;
};
