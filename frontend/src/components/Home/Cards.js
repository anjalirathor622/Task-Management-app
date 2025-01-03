import React from "react"
import { GrView } from "react-icons/gr"
import { MdDeleteForever } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlineAddCircle } from "react-icons/md"
import axios from "axios"

const Cards = ({ home, setInputDiv, data, setUpdateData }) => {
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`
	}
	//task status chnge fuction
	const handleCompleteTask = async (id) => {
		try {
			await axios.put(
				`http://localhost:1000/task/updateTaskStatus/${id}`,
				{},
				{ headers }
			)
		} catch (error) {
			console.log(error)
		}
	}
	//delete task funtion
	const deleteTask = async (id) => {
		try {
			if (window.confirm("you want to remove this task!") === true) {
				const response = await axios.delete(
					`http://localhost:1000/task/deleteTask/${id}`,
					{ headers }
				)
				alert(response.data.massage)
			}
		} catch (error) {
			console.log(error)
		}
	}
	//edit task function
	const updateTask = (id,title,desc,dueDate)=>{
		setInputDiv("fixed")
		setUpdateData({
			id:id,
      title:title,
      desc:desc,
      dueDate:dueDate
		})
	}
	return (
		<div className="grid grid-cols-4 gap-4 p-4">
			{data &&
				data.map((item, i) => (
					<div className="flex flex-col justify-between bg-gray-800 rounded-xl p-4">
						<div>
							<h3 className="text-xl font-semibold">
								{item.title}
							</h3>
							<p className="text-gray-300 pt-2 my-2">
								{item.desc}
							</p>
						</div>
						<h4 className="pb-2">
							dueDate : {(new Date(item.dueDate).toLocaleDateString())}
						</h4>
						<div className="w-full flex flex-row flex-center">
							<button
								onClick={() => handleCompleteTask(item._id)}
								className={`${
									item.completed === true
										? "bg-green-600"
										: "bg-red-500"
								} p-2 rounded-md w-3/6`}
							>
								{item.completed === true
									? "Completed"
									: "Pending..."}
							</button>
							<div className="w-3/6 flex justify-around text-2xl">
								<button>
									<GrView />
								</button>
								<button onClick={() => updateTask(item._id,item.title,item.desc,item.dueDate)}>
									<FaRegEdit />
								</button>
								<button onClick={() => deleteTask(item._id)}>
									<MdDeleteForever />
								</button>
							</div>
						</div>
					</div>
				))}
			{home === true && (
				<button
					onClick={() => setInputDiv("fixed")}
					className="flex flex-col justify-center items-center bg-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
				>
					<MdOutlineAddCircle className="text-5xl" />
					<h2 className="text-3xl mt-4">Add Task</h2>
				</button>
			)}
		</div>
	)
}

export default Cards
