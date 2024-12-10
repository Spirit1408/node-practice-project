import createHttpError from "http-errors";
import { UsersCollection } from "./../db/models/User.js";
import bcrypt from "bcrypt";
import { SessionsCollection } from "./../db/models/Session.js";
import { randomBytes } from "node:crypto";
import { FIFTEEN_MINUTES, ONE_MONTH } from "./../constants/index.js";

export const register = async (data) => {
	const user = await UsersCollection.findOne({ email: data.email });

	if (user) {
		throw createHttpError(409, "User with this email already exists");
	}

	const encryptedPassword = await bcrypt.hash(data.password, 10);

	return await UsersCollection.create({ ...data, password: encryptedPassword });
};

export const login = async (data) => {
	const user = await UsersCollection.findOne({ email: data.email });

	if (!user) {
		throw createHttpError(401, "User not found");
	}

	const isPasswordValid = await bcrypt.compare(data.password, user.password);

	if (!isPasswordValid) {
		throw createHttpError(401, "Invalid password");
	}

	await SessionsCollection.deleteOne({ userId: user._id });

	const accessToken = randomBytes(30).toString("base64");
	const refreshToken = randomBytes(30).toString("base64");

	return await SessionsCollection.create({
		userId: user._id,
		accessToken,
		refreshToken,
		accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
		refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
	});
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
	const session = await SessionsCollection.findOne({ _id: sessionId });

	if (!session) {
		throw createHttpError(401, "Session not found");
	}

	const isExpired = new Date(session.refreshTokenValidUntil) < new Date();

	if (isExpired) {
		throw createHttpError(401, "Session expired");
	}

	const newAccessToken = randomBytes(30).toString("base64");
	const newRefreshToken = randomBytes(30).toString("base64");

	const newSession = {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
		accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
		refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
	};

	await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

	return await SessionsCollection.create({
		userId: session.userId,
		...newSession,
	});
};

export const logout = async (sessionId) =>
	await SessionsCollection.deleteOne({ _id: sessionId });
