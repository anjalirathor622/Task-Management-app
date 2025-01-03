import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"

const SignUp = () => {
	const [data, setData] = useState({ username: "", email: "", password: "" })
	const navigate = useNavigate()
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
	if (isLoggedIn === true) {
		navigate("/")
	}
	const change = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}
	const submit = async () => {
		try {
			if (
				data.username === "" ||
				data.email === "" ||
				data.password === ""
			) {
				alert("all fleids are required")
			} else {
				const response = await axios.post(
					"http://localhost:1000/user/signin",
					data
				)
				setData({ username: "", email: "", password: "" })
				alert(response.data.message)
				navigate("/login")
			}
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<div className=" h-[98vh] flex items-center justify-center">
			<div className="p-4 w-2/6 rounded bg-gray-800">
				<h1 className="text-2xl font-semibold">SignUp</h1>
				<input
					type="username"
					name="username"
					placeholder="Username"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
					onChange={change}
					value={data.username}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
					onChange={change}
					value={data.email}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
					onChange={change}
					value={data.password}
					required
				/>
				<div className="w-full flex items-center justify-between">
					<button
						className="bg-blue-500 px-3 py-2 rounded text-black font-semibold"
						onClick={submit}
					>
						SignUp
					</button>
					<Link
						to="/login"
						className="text-gray-500 hover:text-gray-200"
					>
						Already have an account? Login here.
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
