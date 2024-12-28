import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CourseContinue = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <div className="mb-4">
          <span className="text-gray-600">Level {course.level}</span>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-full bg-[#4743EF] rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
        {/* Add your course content here */}
      </div>
    </div>
  );
};

export default CourseContinue;
