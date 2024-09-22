import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function Navbar() {

    const { isLoggedIn, Logout,user } = useContext(AuthContext)

    const navigate = useNavigate()
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo or Brand Name */}
                    <div className="text-2xl font-bold text-blue-600">
                        Coursera
                    </div>
                    {
                        isLoggedIn ? (
                            <div>
                                <button onClick={() => {
                                    Logout()
                                    navigate('/')
                                }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Logout</button>
                                <button className="ml-5 text-blue-500 px-4 py-2   ">{user}</button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                    Login
                                </button>
                                <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                    Register
                                </button>
                            </div>
                        )
                    }
                    {/* Buttons */}

                </div>
            </div>
        </nav>
    );
}

export default Navbar
