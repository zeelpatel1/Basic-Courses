import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {serverToken}=useContext(AuthContext)
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password,
            });
            if(res.data.token){
                serverToken(res.data.token)

                const userRes=await axios.get('http://localhost:3000/api/auth/user',{
                    headers:{
                        Authorization:`Bearer ${res.data.token}`
                    }
                })
                if(userRes.data.isAdmin){
                    toast.success('Admin Login Successful')
                    navigate('/admin')
                }
                else{
                    toast.success('Login Successful')
                    navigate('/dashboard')
                }
                
            }
        } catch (error) {
           toast.error('Error logging in. Please try again.')
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login
