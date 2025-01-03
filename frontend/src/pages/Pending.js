import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'

const Pending = () => {
  const [data,setData] = useState()
  const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`
	}
	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get(
				"http://localhost:1000/task/pendingTasks",
				{ headers }
			)
      console.log(response)
			setData(response.data.data)
		}
		fetch()
	},[])
  return (
    <Cards home={false} data={data}/>
   )
}

export default Pending