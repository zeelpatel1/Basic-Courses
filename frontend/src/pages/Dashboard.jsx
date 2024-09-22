import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserDashboard() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/getCourse', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            setCourses(res.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Dashboard Header */}
            <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <p className="text-md mt-2">Welcome to your dashboard! Browse all available courses below.</p>
            </header>

            {/* Courses Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-6">Available Courses</h2>

                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((u) => (
                            <div key={u._id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={u.imageLink || "https://via.placeholder.com/150"}
                                    alt="Course"
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{u.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {u.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">${u.price}</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Courses Available</div>
                )}
            </section>
        </div>
    );
}

export default UserDashboard;
