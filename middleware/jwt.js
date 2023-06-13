const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		subject: user.email,
		expiresIn: 86400, // 24 hours
	});
};

const verifyToken = (req, res, next) => {
	let token =
		req.headers["x-access-token"] ||
		req.headers["authorization"] ||
		req.query.token;
	if (!token) {
		return res
			.status(403)
			.send({ status: false, statusCode: 403, message: "No token provided!" });
	}
	token = String(token).replace(/Bearer\s/i, "");

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.send({ status: false, statusCode: 401, message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		req.email = decoded.sub;
		next();
	});
};

module.exports = {
	generateToken,
	verifyToken,
};
