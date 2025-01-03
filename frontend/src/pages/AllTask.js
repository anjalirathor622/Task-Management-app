import React, { useEffect, useState } from "react"
import Cards from "../components/Home/Cards"
import { MdOutlineAddCircle } from "react-icons/md"
import InputData from "../components/Home/InputData"
import axios from "axios"

const AllTask = () => {
	const [inputDiv, setInputDiv] = useState("hidden")
	const [data, setData] = useState()
	const [updateData, setUpdateData] = useState({
		id: "",
		title: "",
		desc: "",
		dueDate: ""
	})
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`
	}
	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get(
				"http://localhost:1000/task/AllTasks",
				{ headers }
			)
			setData(response.data.data)
		}
		fetch()
	},[data])
	return (
		<>
			<div>
				<div className="w-full flex  justify-end p-4">
					<button onClick={() => setInputDiv("fixed")}>
						<MdOutlineAddCircle className="text-3xl text-gray-500 hover:text-gray-100  transition-all duration-300" />
					</button>
				</div>
				{data && (
					<Cards
						home={true}
						setInputDiv={setInputDiv}
						data={data.tasks}
						setUpdateData={setUpdateData}
					/>
				)}
			</div>
			<InputData
				inputDiv={inputDiv}
				setInputDiv={setInputDiv}
				updateData={updateData}
				setUpdateData={setUpdateData}
			/>
		</>
	)
}

export default AllTask
