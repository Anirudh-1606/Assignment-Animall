const mongoose = require("mongoose");

const animalUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports =
	mongoose.models.animalUser || mongoose.model("animalUser", animalUserSchema);
