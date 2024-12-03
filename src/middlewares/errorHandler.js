import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
	if (err instanceof HttpError) {
		res
			.status(err.status)
			.json({ status: err.status, message: err.message, data: err });
		return;
	}

	res
		.status(500)
		.json({ status: 500, message: "Internal server error", data: err.message });
	return;
};