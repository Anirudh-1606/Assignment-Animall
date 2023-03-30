const authService = require("../services/authService");

const authController = {
	async register(req, res) {
		try {
			const { username, password } = req.body;

			const user = await authService.registerUser({ username, password });
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await authService.loginUser({
				username,
				password,
			});
			res.json(user);
		} catch (error) {
			res.status(401).json({ message: error.message });
		}
	},
};

module.exports = authController;
