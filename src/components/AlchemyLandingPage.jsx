import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RiFireLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import DailyStreak from './DailyStreak';
import Courses from './Courses';
import Lab from './Lab';
import CourseCard from './CourseCard';  // Add this import
import StreakCelebration from './StreakCelebration';  // Add this import

const AlchemyLandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [courseProgress, setCourseProgress] = useState(0); // Add progress state
  const [course2Progress, setCourse2Progress] = useState(0); // Add second course progress
  const [inProgressCourses, setInProgressCourses] = useState([
    {
      id: 1,
      name: "Basic Chemistry",
      progress: 45,
      image: "/src/photos/Study chemistry by video tutorial online.png"
    }
  ]); // This would eventually come from your database
  
  const [currentSection, setCurrentSection] = useState(() => {
    // Only use the state if explicitly navigating from another page
    if (location.state?.activeTab) {
      return location.state.activeTab;
    }
    // Default to dashboard when directly accessing the page
    return 'dashboard';
  });

  const totalVideosInCourse = 4; // Total number of videos in course content
  const [watchedVideos, setWatchedVideos] = useState(() => {
    return parseInt(localStorage.getItem('watchedVideos') || '0');
  });

  const progressPercentage = (watchedVideos / totalVideosInCourse) * 100;

  // Add new state for watched videos tracking
  const [courseWatchedVideos, setCourseWatchedVideos] = useState(() => {
    const watched = JSON.parse(localStorage.getItem('watchedVideoIds') || '[]');
    return watched.length;
  });

  useEffect(() => {
    // Update progress when watched videos change
    const totalVideos = 4; // Total number of videos in the course
    const progress = (courseWatchedVideos / totalVideos) * 100;
    setCourseProgress(progress);
  }, [courseWatchedVideos]);

  // Add listener for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const watched = JSON.parse(localStorage.getItem('watchedVideoIds') || '[]');
      setCourseWatchedVideos(watched.length);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Current user:', user); // Debug log
        setUserName(user.displayName || 'User');
      }
    });

    return () => unsubscribe();
  }, []);

  const sampleCourses = [
    {
      id: '1',
      title: 'Basic Chemistry',
      description: 'Learn the fundamentals of chemistry'
    }
  ];

  const renderSmallCourseCard = (course) => (
    <div 
      onClick={() => navigate(`/course/${course.id}`)}
      className="border border-black/20 rounded-[20px] p-4 hover:border-[#4743EF] transition-colors h-[270px] w-[208px] flex flex-col justify-between shadow-custom cursor-pointer hover:shadow-lg"
    >
      <div className="space-y-3">
        <div className="h-[140px] w-full">
          <img 
            src={course.image}
            alt={course.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h3 className="text-sm font-medium text-[#2A3335] line-clamp-2">
          {course.name}
        </h3>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs text-gray-500">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4743EF] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Add effect to reset section when location changes
  useEffect(() => {
    if (!location.state?.activeTab) {
      setCurrentSection('dashboard');
    }
  }, [location]);

  const handleNavigateToSection = (section, options = {}) => {
    setCurrentSection(section);
    if (options.scrollToQuestions) {
      // Add a small delay to ensure component is mounted
      setTimeout(() => {
        const questionsSection = document.querySelector('.questions-section');
        if (questionsSection) {
          questionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const streak = Number(localStorage.getItem('streak') || '0');
    setCurrentStreak(streak);

    // Check if user has already seen the streak today
    const lastStreakDate = localStorage.getItem('lastStreakDate');
    const today = new Date().toDateString();
    
    const shouldShowStreak = 
      currentSection === 'dashboard' && // Only show in dashboard
      streak > 0 && // Must have a streak
      lastStreakDate !== today && // Haven't seen it today
      !sessionStorage.getItem('hasSeenStreak'); // Haven't seen it this session

    if (shouldShowStreak) {
      setShowStreakAnimation(true);
      localStorage.setItem('lastStreakDate', today);
      sessionStorage.setItem('hasSeenStreak', 'true');
    }
  }, [currentSection]); // Add currentSection as dependency

  return (
    <>
      {currentSection === 'dashboard' && (
        <StreakCelebration
          streak={currentStreak}
          isVisible={showStreakAnimation}
          onComplete={() => setShowStreakAnimation(false)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F9FF]">
        <NavBar onSectionChange={setCurrentSection} />
        
        {currentSection === 'dashboard' ? (
          <main className="container mx-auto px-[100px] mt-20">
            <div className="flex gap-[40px]">
              {/* Fixed Left Div - add fixed positioning */}
              <div className="fixed w-[253px] ml-[150px]">
                <div className="grid grid-cols-1 gap-6 mb-20 pb-[20px]">

                  {/* Welcome text above boxes */}
                  <h1 className="text-xl font-bold text-gray-800 my-5 -mb-3">
                    Welcome, {userName}
                  </h1>
                  {/* Replace old streak box with new DailyStreak component */}
                  <DailyStreak />

                  {/* Trophy Box */}
                  <div className="border border-black/20 rounded-[20px] p-4 hover:border-[#4743EF] transition-colors h-[250px] w-[300px] flex flex-col justify-between">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center justify-center h-[70px]">
                        <img 
                          src="/src/photos/cup.png" 
                          alt="Trophy" 
                          className="w-[90px] h-[90px] object-contain"
                        />
                      </div>
                      <p className="text-center text-xl text-[#2A3335] px-2 font-bold">
                        You have finished <span className='text-blue-600 font-bold'>0</span> courses so far
                      </p>
                    </div>
                    <button 
                      onClick={() => handleNavigateToSection('courses')}
                      className="bg-blue-600 text-white rounded-full py-3 px-2 text-lg font-semi-bold hover:bg-blue-700 transition-colors"
                    >
                      Courses
                    </button>
                  </div>

                  <div className="border border-black/20 rounded-[20px] p-4 hover:border-[#4743EF] transition-colors h-[250px] w-[300px] flex flex-col justify-between">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center justify-center h-[70px]">
                        <img 
                          src="/src/photos/pixel heart.png" 
                          alt="Heart" 
                          className="w-[90px] h-[90px] object-contain"
                        />
                      </div>
                      <p className="text-center text-xl text-[#2A3335] px-2 font-bold">
                        You have answered <span className='text-blue-600 font-bold'>{correctAnswers}</span> questions correctly
                      </p>
                    </div>
                    <button 
                      onClick={() => handleNavigateToSection('lab', { scrollToQuestions: true })}
                      className="bg-blue-600 text-white rounded-full py-3 px-2 text-lg font-semi-bold hover:bg-blue-700 transition-colors"
                    >
                      Answer More Questions
                    </button>
                  </div>
                </div>
              </div>

              {/* Centered Right Div */}
              <div className="flex-1 overflow-y-auto pl-[400px] pt-[60px]">
                <div className="flex flex-col items-center gap-8 max-w-[800px] mx-auto">
                  {/* Added Jump back in text */}
                  <h2 className="self-start text-xl font-bold text-[#2A3335] -mt-10 -mb-5 ml-8">
                    Jump back in
                  </h2>

                  {/* First Box - Modified to have button instead of clickable card */}
                  <div className="border border-black/20 rounded-[20px] p-6 hover:border-[#4743EF] transition-colors h-[453px] w-[735px] flex flex-col justify-between shadow-custom">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-full h-[250px] relative">
                        <img 
                          src="/src/photos/chemical experiments for children.png" 
                          alt="Chemical Experiments" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Course Progress</span>
                          <span className="text-sm font-medium text-gray-600">{courseProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#5151FF] transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${courseProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/course/1')}
                      className="bg-blue-600 text-white rounded-full py-3 px-2 text-lg font-semi-bold hover:bg-blue-700 transition-colors"
                    >
                      Continue Course
                    </button>
                  </div>

                  {/* Second Box */}
                  <div className="border border-black/20 rounded-[20px] p-6 hover:border-[#4743EF] transition-colors h-[453px] w-[735px] flex flex-col justify-between shadow-custom">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-[333px] h-[250px] relative">
                        <img 
                          src="/src/photos/Chemistry teacher and student in class.png" 
                          alt="Chemistry Class" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Course Progress</span>
                          <span className="text-sm font-medium text-gray-600">{course2Progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#CC3300] transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${course2Progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#CC3300] text-white rounded-full py-3 px-2 text-lg font-semi-bold hover:bg-[#A32900] transition-colors">
                      Continue Course
                    </button>
                  </div>
                  <h2 className="self-start text-xl font-bold text-[#2A3335] mt-2 -mb-5 ml-8">
                    Continue learning
                  </h2>

                  {/* Dynamic Course Grid */}
                  <div className="grid grid-cols-3 gap-4 w-full mt-2 ml-16">
                    {inProgressCourses.map((course) => (
                      <div key={course.id}>
                        {renderSmallCourseCard(course)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : currentSection === 'courses' ? (
          <Courses />
        ) : currentSection === 'lab' ? (
          <Lab />
        ) : null}
      </div>
    </>
  );
};

export default AlchemyLandingPage;
