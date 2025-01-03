import axios from "axios"
import { useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import Swal from "sweetalert2"

const InputData = ({ inputDiv, setInputDiv, updateData, setUpdateData }) => {
	const [data, setData] = useState({
		title: "",
		desc: "",
		dueDate: ""
	})
	useEffect(() => {
		setData({
			title: updateData.title,
			desc: updateData.desc,
			dueDate: updateData.dueDate
		})
	}, [updateData])

	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}
	const submitData = async () => {
		if (data.title === "" || data.desc === "" || data.dueDate === "") {
			Swal.fire({
				title: "Sorry",
				text: "All feilds are required!",
				icon: "warning",
				background: "#111827",
				color: "#fff"
			})
		} else {
			await axios.post("http://localhost:1000/task/createTask", data, {
				headers
			})

			setData({
				title: "",
				desc: "",
				dueDate: ""
			})
			setInputDiv("hidden")
		}
	}
	const updateTask = async () => {
		if (data.title === "" || data.desc === "" || data.dueDate === "") {
			Swal.fire({
				title: "Sorry",
				text: "All feilds are required!",
				icon: "warning",
				background: "#111827",
				color: "#fff"
			})
		} else {
			await axios.put(
				`http://localhost:1000/task/updateTask/${updateData.id}`,
				data,
				{
					headers
				}
			)
			setUpdateData({
				id: "",
				title: "",
				desc: "",
				dueDate: ""
			})
			setData({
				title: "",
				desc: "",
				dueDate: ""
			})
			setInputDiv("hidden")
		}
	}
	return (
		<>
			{/* <div
				className={`${inputDiv}top-0 left-0 bg-gray-800 opacity-70 h-screen w-full`}
			></div> */}
			<div
				className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
			>
				<div className="w-2/6 bg-gray-900 p-4 rounded">
					<div className="flex justify-end">
						<button
							onClick={() => {
								setInputDiv("hidden")
								setData({
									title: "",
									desc: "",
									dueDate: ""
								})
								setUpdateData({
									id: "",
									title: "",
									desc: "",
									dueDate: ""
								})
							}}
							className="text-2xl"
						>
							<RxCross2 />
						</button>
					</div>
					<label>Title:</label>
					<input
						type="text"
						placeholder="Title"
						name="title"
						className="px-3 py-2 rounded w-full bg-gray-600 my-3"
						value={data.title}
						onChange={handleChange}
					/>
					<label>Due Date:</label>
					<input
						type="date"
						name="dueDate"
						placeholder="due Date"
						className="px-3 py-2 rounded w-full bg-gray-600 my-3"
						value={data.dueDate}
						onChange={handleChange}
					/>
					<label>description:</label>
					<textarea
						name="desc"
						cols="15"
						rows="10"
						placeholder="Description..."
						className="px-3 py-2 rounded w-full bg-gray-600 my-3"
						value={data.desc}
						onChange={handleChange}
					></textarea>
					{updateData.id === "" ? (
						<button
							className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
							onClick={submitData}
						>
							Submit
						</button>
					) : (
						<button
							className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
							onClick={updateTask}
						>
							Update
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default InputData
