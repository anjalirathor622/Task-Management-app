import React from "react"
import { CgNotes } from "react-icons/cg"
import { MdOutlineRemoveDone } from "react-icons/md"
import { IoMdDoneAll } from "react-icons/io"
import { Link } from "react-router-dom"
const Sidebar = () => {
	const data = [
		{
			title: "All task",
			icon: <CgNotes />,
      link:"/"
		},
		{
			title: "Compeleted task",
			icon: <IoMdDoneAll />,
      link:"/completedTask"
		},
		{
			title: "Pending task",
			icon: <MdOutlineRemoveDone />,
      link:"/pendingTask"
		}
	]
	return (
		<>
			<div>
				<h2 className="text-xl font-semibold">the code master</h2>
				<h4 className="mb-2 text-gray-400">email</h4>
				<hr />
			</div>
			<div>
				{data.map((items, i) => (
					<Link to={items.link} key={i} className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300">
						{items.icon} &nbsp; {items.title}
					</Link>
				))}
			</div>
			<div>
				<button className="bg-gray-600 w-full p-2 rounded">
					Log Out
				</button>
			</div>
		</>
	)
}

export default Sidebar
