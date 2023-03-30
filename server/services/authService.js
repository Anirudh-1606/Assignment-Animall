const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const animalUser = require("../models/User");

function generateToken(user) {
	return jwt.sign(
		{
			userId: user.id,
			username: user.username,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" },
	);
}

async function registerUser(userData) {
	try {
		const hashedPassword = await bcrypt.hash(userData.password, 12);
		const user = new animalUser({
			username: userData.username,
			password: hashedPassword,
		});
		const result = await user.save();
		const token = generateToken(result);
		return { userId: result.id, token: token, tokenExpiration: 1 };
	} catch (err) {
		throw err;
	}
}

async function loginUser(userData) {
	try {
		const user = await animalUser.findOne({ username: userData.username });
		if (!user) {
			throw new Error("User does not exist!");
		}
		const isEqual = await bcrypt.compare(userData.password, user.password);
		if (!isEqual) {
			throw new Error("Password is incorrect!");
		}
		const token = generateToken(user);
		return { userId: user.id, token: token, tokenExpiration: 1 };
	} catch (err) {
		throw err;
	}
}

module.exports = {
	registerUser,
	loginUser,
};
