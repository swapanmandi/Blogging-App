import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-3xl text-center p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Admin Panel</h1>
            <p className="text-gray-600 text-lg mb-8">
                Manage your blog posts, users, and settings all in one place. Please <Link to="/admin/signin"><strong className=" text-blue-600">log in</strong></Link>  to continue.
            </p>
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => window.location.href = "/admin/dashboard"}
            >
                Go to Admin Panel
            </button>
        </div>
    </div>
);
}
