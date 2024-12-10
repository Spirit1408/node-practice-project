import createHttpError from "http-errors";
import { SessionsCollection } from "./../db/models/Session.js";
import { UsersCollection } from "./../db/models/User.js";

export const authenticate = async (req, res, next) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		next(createHttpError(401, "Unauthorized"));
		return;
	}

	const bearer = authHeader.split(" ")[0];
	const token = authHeader.split(" ")[1];

	if (bearer !== "Bearer" || !token) {
		next(createHttpError(401, "Wrong access token"));
		return;
	}

	const session = await SessionsCollection.findOne({ accessToken: token });

	if (!session) {
		next(createHttpError(401, "No session found"));
		return;
	}

	const isExpired = new Date(session.refreshTokenValidUntil) < new Date();

	if (isExpired) {
		next(createHttpError(401, "Access token is expired"));
		return;
	}

	const user = await UsersCollection.findById(session.userId);

	if (!user) {
		next(createHttpError(401, "User not found"));
		return;
	}

	req.user = user;

	next();
};
