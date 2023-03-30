const animalUser = require("../models/User");

const userController = {
	async getUsers(req, res) {
		try {
			const users = await animalUser.find();
			res.json(users);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getUserById(req, res) {
		try {
			const user = await animalUser.findById(req.params.id);
			if (!user) {
				throw new Error("User not found");
			}
			res.json(user);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	async updateUser(req, res) {
		try {
			const { username, password } = req.body;
			const user = await animalUser.findByIdAndUpdate(
				req.params.id,
				{ username, password },
				{ new: true },
			);
			if (!user) {
				throw new Error("User not found");
			}
			res.json(user);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	async deleteUser(req, res) {
		try {
			const user = await animalUser.findByIdAndDelete(req.params.id);
			if (!user) {
				throw new Error("User not found");
			}
			res.json({ message: "User deleted" });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
};

module.exports = userController;
