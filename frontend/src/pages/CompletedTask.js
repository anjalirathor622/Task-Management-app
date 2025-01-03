import React, { useEffect, useState } from "react"
import Cards from "../components/Home/Cards"
import axios from "axios"

const CompletedTask = () => {
	const [data, setData] = useState()
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`
	}
	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get(
				"http://localhost:1000/task/completeTasks",
				{ headers }
			)
			// console.log(response)
			setData(response.data.data)
		}
		fetch()
	}, [data])
	return <Cards home={false} data={data} />
}

export default CompletedTask
