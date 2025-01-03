import "./App.css"
import AllTask from "./pages/AllTask"
import CompletedTask from "./pages/CompletedTask"
import Home from "./pages/Home"
import { Route, Routes, useNavigate } from "react-router-dom"
import Pending from "./pages/Pending"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authActions } from "./store/auth"

const App = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
	// console.log(isLoggedIn)
	useEffect(() => {
		if (localStorage.getItem("id") && localStorage.getItem("token")) {
			dispatch(authActions.login())
		} else if (isLoggedIn === false) {
			navigate("/signup")
		}
	}, [])
	return (
		<div className="bg-gray-900 text-white h-screen p-2 relative">
			<Routes>
				<Route exact path="/" element={<Home />}>
					<Route index element={<AllTask />} />
					<Route path="/completedTask" element={<CompletedTask />} />
					<Route path="/pendingTask" element={<Pending />} />
				</Route>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	)
}

export default App
