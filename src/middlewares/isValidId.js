import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		next(createHttpError(400, "Invalid id"));
		return;
	}

	next();
};
