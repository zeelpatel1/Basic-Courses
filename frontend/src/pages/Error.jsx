import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700">Oops!</h1>
        <p className="text-2xl text-gray-600 mt-4">Something went wrong.</p>
        <p className="text-lg text-gray-500 mt-2">The page you are looking for might be missing or an error occurred.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
