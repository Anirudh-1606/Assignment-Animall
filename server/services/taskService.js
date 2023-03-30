const Task = require("../models/Task");

async function getAllTasks() {
	return await Task.find();
}

async function getTasksByUserId(userId) {
	return await Task.find({ userId });
}

async function createTask(taskData) {
	const task = new Task(taskData);
	return await task.save();
}

async function updateTask(id, taskData) {
	return await Task.findByIdAndUpdate(id, taskData, { new: true });
}

async function deleteTask(id) {
	await Task.findByIdAndDelete(id);
}

module.exports = {
	getAllTasks,
	getTasksByUserId,
	createTask,
	updateTask,
	deleteTask,
};
