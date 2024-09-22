import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [published, setPublished] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/courses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(res.data.courses );
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { title, description, price, imageLink, published };

    try {
      if (currentCourseId) {
        // Update existing course
        await axios.put(`http://localhost:3000/api/users/courses/${currentCourseId}`, courseData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        // Create new course
        await axios.post('http://localhost:3000/api/users/courses', courseData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price);
    setImageLink(course.imageLink);
    setPublished(course.published);
    setCurrentCourseId(course._id); // Set course ID for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImageLink('');
    setPublished(false);
    setCurrentCourseId(null); // Clear course ID
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Course Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add or Edit Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Course title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Course description"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Course price"
            />
          </div>

          <div>
            <label htmlFor="imageLink" className="block text-gray-700 font-semibold mb-1">Image Link</label>
            <input
              type="text"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Image URL"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="published" className="text-gray-700">Published</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {currentCourseId ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      </div>

      {/* Courses List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Courses List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Published</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.price}</td>
                  <td className="border px-4 py-2">{course.published ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleEdit(course)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(course._id)} className="text-red-500 hover:underline ml-4">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">No courses available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
