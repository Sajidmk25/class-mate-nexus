
import React from "react";

const ClassInfo = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3 text-gradient font-playfair">Advanced Physics - Wave Theory</h2>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
        <p className="text-gray-300">
          Today's session explores the fundamentals of wave theory, including mechanical and electromagnetic waves, 
          interference patterns, and practical applications in modern technology.
        </p>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <h3 className="text-sm font-medium text-primary">Duration</h3>
            <p className="text-lg">Unlimited</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <h3 className="text-sm font-medium text-primary">Materials</h3>
            <p className="text-lg">4 files</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <h3 className="text-sm font-medium text-primary">Assignment</h3>
            <p className="text-lg">Due Fri</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <h3 className="text-sm font-medium text-primary">Status</h3>
            <p className="text-lg">In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
