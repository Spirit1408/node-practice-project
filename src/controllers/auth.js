import { login, logout, refreshSession, register } from "../services/auth.js";

export const registerController = async (req, res) => {
	const user = await register(req.body);

	res.status(201).json({
		status: 201,
		message: "User registered successfully!",
		data: user,
	});
};

export const loginController = async (req, res) => {
	const session = await login(req.body);

	res.cookie("sessionId", session._id, {
		httpOnly: true,
		expires: session.refreshTokenValidUntil,
	});
	res.cookie("refreshToken", session.refreshToken, {
		httpOnly: true,
		expires: session.refreshTokenValidUntil,
	});

	res.status(200).json({
		status: 200,
		message: "User logged in successfully!",
		data: { accessToken: session.accessToken },
	});
};

export const refreshSessionController = async (req, res) => {
	const session = await refreshSession({
		sessionId: req.cookies.sessionId,
		refreshToken: req.cookies.refreshToken,
	});

	res.cookie("sessionId", session._id, {
		httpOnly: true,
		expires: session.refreshTokenValidUntil,
	});
	res.cookie("refreshToken", session.refreshToken, {
		httpOnly: true,
		expires: session.refreshTokenValidUntil,
	});

	res.status(200).json({
		status: 200,
		message: "Session refreshed successfully!",
		data: { accessToken: session.accessToken },
	});
};

export const logoutController = async (req, res) => {
	if (req.cookies.sessionId) {
		await logout(req.cookies.sessionId);
	}

	res.clearCookie("sessionId");
	res.clearCookie("refreshToken");

	res.sendStatus(204);
};
