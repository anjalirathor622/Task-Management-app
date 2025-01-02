import React from "react"
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

const Cards = ({home, setInputDiv}) => {
	const data = [
		{
			title: "ajsnufuehfjen",
			desc: "Derivatives market data shows FIIs net sold 78,868 contracts of Nifty futures in the 4 trading sessions while ",
			dueDate: "12/2/24",
            status:"Complete"
		},
		{
			title: "ajsnufuehfjen",
			desc: "OI rose by 74,992 contracts; thus implying build-up of short positions in Nifty.",
			dueDate: "12/2/24",
            status:"In Progress"
		},
		{
			title: "ajsnufuehfjen",
			desc: "Markets Today LIVE: Benchmark Indian equity indices BSE Sensex and Nifty50 opened higher on Thursday",
			dueDate: "12/2/24",
            status:"Pending..."
		},
		{
			title: "ajsnufuehfjen",
			desc: "amid mixed global cues as most major global markets returned from the New Year's Day break",
			dueDate: "12/2/24",
            status:"Complete"
		},
		{
			title: "ajsnufuehfjen",
			desc: "amid mixed global cues as most major global markets returned from the New Year's Day break",
			dueDate: "12/2/24",
            status:"Pending..."
		}
	]
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
							<h4 className="pb-2">dueDate : {item.dueDate}</h4>
						<div className="w-full flex flex-row flex-center">
							<button className={`${item.status==="Complete"?"bg-green-600":"bg-red-500"} p-2 rounded-md w-3/6`}>
								{item.status}
							</button>
							<div className="w-3/6 flex justify-around text-2xl">
								<button><GrView /></button>
								<button><FaRegEdit /></button>
								<button><MdDeleteForever /></button>
							</div>
						</div>
					</div>
				))}
                {home===true && <button onClick={()=>setInputDiv("fixed")} className="flex flex-col justify-center items-center bg-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
                <MdOutlineAddCircle className="text-5xl" />
                    <h2 className="text-3xl mt-4">Add Task</h2>
                </button>}
               
		</div>
	)
}

export default Cards
