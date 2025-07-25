import React from 'react'

const Dummy = () => {
  return (


    <div className="bg-gray-100 flex items-center justify-center ">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Form</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700"
                    >Name</label
                    >
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700"
                    >Email</label
                    >
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700"
                    >Date and Time</label
                    >
                    <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    required
                    pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                    title="Enter date and time in ISO format: YYYY-MM-DDTHH:MM"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                >
                    Submit
                </button>
                </div>
 
    </div>
)}

export default Dummy;