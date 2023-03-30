const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/db");

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, jwtSecret);
		req.userId = decodedToken.id;
		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = authMiddleware;
