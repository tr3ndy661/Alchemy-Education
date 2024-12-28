import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CourseContinue from './CourseContinue';

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState(() => {
    const watched = JSON.parse(localStorage.getItem('watchedVideoIds') || '[]');
    return watched.length;
  });

  // Calculate progress for each course
  const calculateProgress = (courseId) => {
    if (courseId === 1) {
      // First course progress based on watched videos
      return (watchedVideos / 4) * 100; // 4 is total videos in course
    }
    // Other courses start at 0%
    return 0;
  };

  const courseCards = [
    {
      id: 1,
      image: "/src/photos/Study chemistry by video tutorial online.png",
      name: "Introduction to Chemistry",
      level: 1,
      get progress() { return calculateProgress(1) }
    },
    { id: 2, image: "/src/photos/Study chemistry by video tutorial online.png", name: "Organic Chemistry", level: 2, progress: 0 },
    { id: 3, image: "/src/photos/Study chemistry by video tutorial online.png", name: "Inorganic Chemistry", level: 3, progress: 0 },
    { id: 4, image: "/src/photos/Study chemistry by video tutorial online.png", name: "Physical Chemistry", level: 4, progress: 0 },
    { id: 5, image: "/src/photos/Study chemistry by video tutorial online.png", name: "Biochemistry", level: 5, progress: 0 },
  ];

  // Add effect to update progress when videos are watched
  useEffect(() => {
    const handleStorageChange = () => {
      const watched = JSON.parse(localStorage.getItem('watchedVideoIds') || '[]');
      setWatchedVideos(watched.length);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('videoWatched', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('videoWatched', handleStorageChange);
    };
  }, []);

  // Function to check if a level should be locked
  const isLevelLocked = (currentLevel, cards) => {
    if (currentLevel === 1) return false;
    const previousLevel = cards.find(card => card.level === currentLevel - 1);
    return !previousLevel || calculateProgress(previousLevel.id) < 100;
  };

  const handleStartCourse = (courseId) => {
    const course = courseCards.find(c => c.id === courseId);
    if (course && !isLevelLocked(course.level, courseCards)) {
      navigate(`/course/${courseId}`, { state: { course } });
    }
  };

  const handleCourseClick = (courseId) => {
    const course = courseCards.find(c => c.id === courseId);
    if (course && !isLevelLocked(course.level, courseCards)) {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      {!selectedCourse ? (
        <>
          {/* Section 1: Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#2A3335] mb-4">Courses:</h1>
            <p className="text-gray-600 text-lg">
              Choose the path you like and learn step by step to mastery
            </p>
          </div>

          {/* Section 2: Course Cards */}
          <div className="flex items-center space-x-6 bg-white rounded-lg p-4 ">
            {/* Left: Image */}
            <div className="w-[73px] h-[73px] flex-shrink-0">
              <img
                src="/src/photos/Erlenmeyer flask and test tube for scientific experiments.png"
                alt="Erlenmeyer flask and test tube"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right: Content */}
            <div className="flex flex-col space-y-2">
              <div className="bg-[#5151FF]/[0.32] px-8  rounded-[5px] w-fit">
                <span className="text-[#5151FF] font-medium text-[18px]">Beginning</span>
              </div>
              <div className="flex flex-reverse items-center justify-between">
                <h2 className="text-lg font-semi-bold text-[#2A3335] text-[20px]">Introduction to Chemistry</h2>
                <p className="text-gray-600 text-sm ml-10">More information about the course and a little description </p>
                <button 
                  onClick={() => handleStartCourse(1)} 
                  className="px-8 py-2 text-[#5151FF] border-2 border-[#5151FF] rounded-full text-base font-semibold hover:bg-blue-50 transition-colors ml-[614px]"
                >
                  Start Path
                </button>
              </div>
            </div>
          </div>

          {/* New Dark Section */}
          <div className="mt-12 bg-black/10 -mx-4 px-4 py-8 rounded-[20px]">
            <div className="container mx-auto">
              <div className="grid grid-cols-5 gap-4">
                {courseCards.map((course) => {
                  const locked = isLevelLocked(course.level, courseCards);
                  const currentProgress = calculateProgress(course.id);
                  
                  return (
                    <div key={course.id} className="relative group">
                      {/* Level indicator */}
                      <div className="relative -top-3 left-4 text-[#2A3335]/50 px-3 py-1 mr-58 rounded-full text-xs font-bold z-20">
                        Level {course.level}
                      </div>


                    <div 
                      onClick={() => !locked && handleCourseClick(course.id)}
                      className={`bg-white rounded-[20px] p-3 transition-all duration-300 h-[240px] w-full flex flex-col justify-between shadow-custom relative overflow-hidden
                        ${locked ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border hover:border-[#4743EF]'}`}>
                        {locked && (
                          <div className="absolute inset-0 bg-[#E8E8E8] bg-opacity-80 backdrop-blur-[2px] z-20 flex items-center justify-center">
                            <FaLock className="text-[#5151FF] w-20 h-20" />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <div className="h-[140px] w-[180px] mx-auto">
                            <img 
                              src={course.image}
                              alt={course.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="text-xs font-medium text-[#2A3335] line-clamp-2">
                            {course.name}
                          </h3>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-500">Progress</span>
                              <span className="text-[10px] text-gray-500">
                                {currentProgress.toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#4743EF] transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${currentProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <CourseContinue 
          courseName={selectedCourse.name}
          courseLevel={selectedCourse.level}
        />
      )}
    </div>
  );
};

export default Courses;
