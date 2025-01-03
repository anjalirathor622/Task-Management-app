import React, { useEffect, useState } from "react"
import { CgNotes } from "react-icons/cg"
import { MdOutlineRemoveDone } from "react-icons/md"
import { IoMdDoneAll } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../store/auth"
import axios from "axios"
const Sidebar = () => {
	const [data, setData] = useState()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const SidebarData = [
		{
			title: "All task",
			icon: <CgNotes />,
			link: "/"
		},
		{
			title: "Compeleted task",
			icon: <IoMdDoneAll />,
			link: "/completedTask"
		},
		{
			title: "Pending task",
			icon: <MdOutlineRemoveDone />,
			link: "/pendingTask"
		}
	]
	const logout = () => {
		dispatch(authActions.logout())
		localStorage.clear("id")
		localStorage.clear("token")
		navigate("/signup")
	}
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
	}, [])
	return (
		<>
			{data && (
				<div>
					<h2 className="text-xl font-semibold">{data.username}</h2>
					<h4 className="mb-2 text-gray-400">{data.email}</h4>
					<hr />
				</div>
			)}

			<div>
				{SidebarData.map((items, i) => (
					<Link
						to={items.link}
						key={i}
						className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
					>
						{items.icon} &nbsp; {items.title}
					</Link>
				))}
			</div>
			<div>
				<button
					className="bg-gray-600 w-full p-2 rounded"
					onClick={logout}
				>
					Log Out
				</button>
			</div>
		</>
	)
}

export default Sidebar
