const router = require("express").Router()
const Task = require("../models/task")
const User = require("../models/user")
const { authanticatToken } = require("./auth")
//Create Tasks
router.post("/createTask", authanticatToken, async (req, res) => {
	try {
		const { title, description, dueDate } = req.body
		const { id } = req.headers
		const newTask = new Task({
			title: title,
			description: description,
			dueDate: new Date(`${dueDate}`)
		})
		const saveTask = await newTask.save()
		const taskId = saveTask._id
		await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } })
		res.status(200).json({ message: "Task Created", newTask })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//Get All Tasks
router.get("/AllTasks", authanticatToken, async (req, res) => {
	try {
		const { id } = req.headers
		const userData = await User.findById(id).populate({
			path: "tasks",
			optoins: { sort: { createdAt: 1 } }
		})
		res.status(200).json({ data: userData })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//Delete Tasks
router.delete("/deleteTask/:id", authanticatToken, async (req, res) => {
	try {
		const { id } = req.params
		const userId = req.headers.id
		await Task.findByIdAndDelete(id)
		await User.findByIdAndUpdate(userId, { $pull: { tasks: id } })
		res.status(200).json({ massage: "Task Deleted Successfully" })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//Upadate Tasks
router.put("/updateTask/:id", authanticatToken, async (req, res) => {
	try {
		const { id } = req.params
		const { title, description, dueDate } = req.body
		const updatedTask = await Task.findByIdAndUpdate(id, {
			title: title,
			description: description,
			dueDate: new Date(`${dueDate}`)
		})
		res.status(200).json({ massage: "Task Updated Successfully" })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//update  complete or pending state
router.put("/updateTaskStatus/:id", authanticatToken, async (req, res) => {
	try {
		const { id } = req.params;
        const TaskData = await Task.findById(id)
		const completeTask = TaskData.completed;
		await Task.findByIdAndUpdate(id, {
			completed: !completeTask})
		res.status(200).json({ massage: "Task Updated Successfully" })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//get All Complete tasks
router.get("/CompleteTasks", authanticatToken, async (req, res) => {
	try {
		const { id } = req.headers
		const Data = await User.findById(id).populate({
			path: "tasks",
			match:{completed:true},
			optoins: { sort: { createdAt: -1 } }
		});
		const compTaskData = Data.tasks;
		res.status(200).json({ data: compTaskData })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
//get All Pending tasks
router.get("/pendingTasks", authanticatToken, async (req, res) => {
	try {
		const { id } = req.headers
		const Data = await User.findById(id).populate({
			path: "tasks",
			match:{completed:false},
			optoins: { sort: { createdAt: -1 } }
		});
		const compTaskData = Data.tasks;
		res.status(200).json({ data: compTaskData })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Internal Server Error" })
	}
})
module.exports = router
