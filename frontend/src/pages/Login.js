import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className=" h-[98vh] flex items-center justify-center">
			<div className="p-4 w-2/6 rounded bg-gray-800">
				<h1 className="text-2xl font-semibold">Login</h1>
				<input
					type="username"
                    name="username"
					placeholder="Username"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
				/>
                <input
					type="password"
                    name="password"
					placeholder="Password"
					className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
				/>
                <div className='w-full flex items-center justify-between'>
                <button className="bg-blue-500 px-3 py-2 rounded text-black font-semibold">Login</button>
                <Link to="/signup" className='text-gray-500 hover:text-gray-200'>Not having an account? SignUp here.</Link>
                </div>
			</div>
		</div>
  )
}

export default Login