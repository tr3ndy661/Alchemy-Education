import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!course?.id) {
      console.error('Course ID is missing:', course);
      return;
    }
    navigate(`/course/${course.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="border border-black/20 rounded-[20px] p-4 hover:border-[#4743EF] transition-colors h-[270px] w-[208px] flex flex-col justify-between shadow-custom cursor-pointer hover:shadow-lg"
    >
      <div className="space-y-3">
        <div className="h-[140px] w-full">
          <img 
            src="/src/photos/Study chemistry by video tutorial online.png"
            alt={course.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h3 className="text-sm font-medium text-[#2A3335] line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
