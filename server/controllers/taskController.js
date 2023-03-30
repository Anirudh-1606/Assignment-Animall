const taskService = require("../services/taskService");

const taskController = {
	async getAllTasks(req, res) {
		try {
			const tasks = await taskService.getAllTasks();
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getTasksByUserId(req, res) {
		try {
			const userId = req.params.userId;
			const tasks = await taskService.getTasksByUserId(userId);
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async createTask(req, res) {
		try {
			const task = await taskService.createTask(req.body);
			res.status(201).json(task);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async updateTask(req, res) {
		try {
			const task = await taskService.updateTask(req.params.id, req.body);
			console.log(req.body);
			res.json(task);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	async deleteTask(req, res) {
		try {
			await taskService.deleteTask(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
};

module.exports = taskController;
