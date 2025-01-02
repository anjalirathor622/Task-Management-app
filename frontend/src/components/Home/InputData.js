import { RxCross2 } from "react-icons/rx"

const InputData = ({ inputDiv, setInputDiv }) => {
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
							onClick={() => setInputDiv("hidden")}
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
					/>
                    <label>Due Date:</label>
                    <input
						type="date"
						name="dueDate"
						placeholder="due Date"
						className="px-3 py-2 rounded w-full bg-gray-600 my-3"
					/>
                    <label>Description:</label>
					<textarea
						name="desc"
						cols="15"
						rows="10"
						placeholder="Description..."
						className="px-3 py-2 rounded w-full bg-gray-600 my-3"
					></textarea>
					
					<button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold">
						Submit
					</button>
				</div>
			</div>
		</>
	)
}

export default InputData
