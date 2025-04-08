
import React from 'react';

const Courses = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Your enrolled courses will appear here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Course cards will go here */}
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">Sample Course 1</h3>
              <p className="text-sm text-gray-500">Introduction to Node.js</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">Sample Course 2</h3>
              <p className="text-sm text-gray-500">JavaScript Fundamentals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
