import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authActions } from "../store/auth"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
	const [data, setData] = useState({ username: "", password: "" })
	const dispatch = useDispatch()
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
			if (data.username === "" || data.password === "") {
				alert("all fleids are required")
			} else {
				const response = await axios.post(
					"http://localhost:1000/user/login",
					data
				)
				setData({ username: "", password: "" })
				console.log(response)
				localStorage.setItem("id", response.data.id)
				localStorage.setItem("token", response.data.token)
				dispatch(authActions.login())
				navigate("/")
			}
		} catch (error) {
			alert(error.response.data.message)
		}
	}
	return (
		<div className=" h-[98vh] flex items-center justify-center">
			<div className="p-4 w-2/6 rounded bg-gray-800">
				<h1 className="text-2xl font-semibold">Login</h1>
				<input
					type="username"
					name="username"
					placeholder="Username"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
					value={data.username}
					onChange={change}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
					value={data.password}
					onChange={change}
				/>
				<div className="w-full flex items-center justify-between">
					<button
						className="bg-blue-500 px-3 py-2 rounded text-black font-semibold"
						onClick={submit}
					>
						Login
					</button>
					<Link
						to="/signup"
						className="text-gray-500 hover:text-gray-200"
					>
						Not having an account? SignUp here.
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
