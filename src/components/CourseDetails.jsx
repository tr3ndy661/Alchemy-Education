import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

// Move the content declaration outside the component
const basicChemistryContent = {
  title: "Basic Chemistry",
  sections: [
    {
      title: "Chemical Bonds",
      videoId: "1xSQlwWGT8M",
      materials: [
        {
          title: "Chemical Bonding Guide",
          url: "https://www.khanacademy.org/science/chemistry/chemical-bonds",
          type: "pdf"
        }
      ]
    },
    {
      title: "Chemical Reactions",
      videoId: "8m6RtOpqvtU",
       materials: [
        {
          title: "Chemical Reactions Guide",
          url: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome",
          type: "pdf"
        }
      ]
    },
    {
      title: "The Periodic Table",
      videoId: "0RRVV4Diomg",
      materials: [
        {
          title: "Periodic Table Guide",
          url: "https://www.khanacademy.org/science/chemistry/periodic-table",
          type: "pdf"
        }
      ]
    },
    {
      title: "Chemical Equations",
      videoId: "eNsVaUCzvLA",
      materials: [
        {
          title: "Chemical Equations Notes",
          url: "https://www.khanacademy.org/science/chemistry/chemical-equations",
          type: "pdf"
        }
      ]
    }
  ]
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [activeSection, setActiveSection] = useState('video');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [watchedVideos, setWatchedVideos] = useState(() => {
    return parseInt(localStorage.getItem('watchedVideos') || '0');
  });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const totalVideos = basicChemistryContent.sections.length;

  const [watchedVideoIds, setWatchedVideoIds] = useState(() => {
    return new Set(JSON.parse(localStorage.getItem('watchedVideoIds') || '[]'));
  });

  // Calculate progress based on watched videos
  const calculateProgress = () => {
    const totalVideos = basicChemistryContent.sections.length;
    const watchedCount = watchedVideoIds.size;
    return (watchedCount / totalVideos) * 100;
  };

  useEffect(() => {
    // Set the first video as active when component mounts
    if (basicChemistryContent.sections.length > 0) {
      const watched = new Set(JSON.parse(localStorage.getItem('watchedVideoIds') || '[]'));
      const firstUnwatchedIndex = basicChemistryContent.sections.findIndex(
        section => !watched.has(section.videoId)
      );
      const startIndex = firstUnwatchedIndex === -1 ? 0 : firstUnwatchedIndex;
      setCurrentVideoIndex(startIndex);
      setActiveVideo(basicChemistryContent.sections[startIndex].videoId);
    }
  }, []);

  const renderVideoPlayer = (videoId) => {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={embedUrl}
          className="w-full h-[500px]"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  };

  const handleCourseComplete = () => {
    // Add current video to watched videos if not already watched
    const videoId = basicChemistryContent.sections[currentVideoIndex].videoId;
    const newWatchedVideos = new Set(watchedVideoIds);
    
    if (!newWatchedVideos.has(videoId)) {
      newWatchedVideos.add(videoId);
      setWatchedVideoIds(newWatchedVideos);
      localStorage.setItem('watchedVideoIds', JSON.stringify([...newWatchedVideos]));
      
      // Calculate and store new progress
      const progress = (newWatchedVideos.size / basicChemistryContent.sections.length) * 100;
      localStorage.setItem('courseProgress', progress.toString());
      
      // Dispatch progress update
      window.dispatchEvent(new CustomEvent('courseProgressUpdate', {
        detail: { progress }
      }));
    }

    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Move to next video if available
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < basicChemistryContent.sections.length) {
      const nextVideo = basicChemistryContent.sections[nextIndex];
      handleVideoWatch(nextVideo.videoId);
    }
  };

  const handleGoToCourses = () => {
    navigate('/dashboard', { state: { activeTab: 'courses' } });
  };

  const handleVideoWatch = (videoId) => {
    setActiveVideo(videoId);
    const newWatchedVideos = new Set(watchedVideoIds);
    
    if (!newWatchedVideos.has(videoId)) {
      newWatchedVideos.add(videoId);
      setWatchedVideoIds(newWatchedVideos);
      
      // Update localStorage
      localStorage.setItem('watchedVideoIds', JSON.stringify([...newWatchedVideos]));
      
      // Calculate and store progress
      const progress = (newWatchedVideos.size / basicChemistryContent.sections.length) * 100;
      localStorage.setItem('courseProgress', progress.toString());
      
      // Dispatch progress update event
      window.dispatchEvent(new CustomEvent('courseProgressUpdate', {
        detail: { progress }
      }));
    }

    // Find and update current video index
    const index = basicChemistryContent.sections.findIndex(section => section.videoId === videoId);
    if (index !== -1) {
      setCurrentVideoIndex(index);
    }
  };

  const handleNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < basicChemistryContent.sections.length) {
      const nextVideo = basicChemistryContent.sections[nextIndex];
      handleVideoWatch(nextVideo.videoId);
    }
  };

  // Add this function to your component
  const resetProgress = () => {
    localStorage.removeItem('watchedVideoIds');
    localStorage.removeItem('courseProgress');
    localStorage.removeItem('watchedVideos');
    setWatchedVideoIds(new Set());
    setWatchedVideos(0);
    setCurrentVideoIndex(0);
    setIsCourseCompleted(false); // Reset course completion state
    window.dispatchEvent(new CustomEvent('courseProgressUpdate', {
      detail: { progress: 0 }
    }));
  };

  const handleCompleteCourse = () => {
    // Mark all videos as watched
    const allVideoIds = basicChemistryContent.sections.map(section => section.videoId);
    const newWatchedVideos = new Set(allVideoIds);
    setWatchedVideoIds(newWatchedVideos);
    
    // Update localStorage
    localStorage.setItem('watchedVideoIds', JSON.stringify([...newWatchedVideos]));
    localStorage.setItem('courseProgress', '100');
    
    // Show confetti and update state
    setShowConfetti(true);
    setIsCourseCompleted(true);
    setTimeout(() => setShowConfetti(false), 5000);
    
    // Dispatch progress update
    window.dispatchEvent(new CustomEvent('courseProgressUpdate', {
      detail: { progress: 100 }
    }));
  };

  // Check if course is complete
  useEffect(() => {
    const progress = calculateProgress();
    if (progress === 100) {
      setIsCourseCompleted(true);
    }
  }, [watchedVideoIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F9FF] p-8">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2A3335] mb-8">
          {basicChemistryContent.title}
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Sidebar - Course Navigation */}
          <div className="col-span-1 bg-white rounded-[20px] p-6 shadow-custom">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {basicChemistryContent.sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoWatch(section.videoId)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    activeVideo === section.videoId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {section.title}
                </button>
              ))}
              {isCourseCompleted && (
                <button
                  onClick={handleGoToCourses}
                  className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Back to Courses
                </button>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2">
            {/* Video Player with Next Button */}
            <div className="bg-white rounded-[20px] p-6 shadow-custom mb-8">
              {activeVideo ? (
                <div className="space-y-4">
                  {renderVideoPlayer(activeVideo)}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span>Progress: {calculateProgress().toFixed(0)}%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress()}%` }}
                        />
                      </div>
                      <span>({watchedVideoIds.size}/{basicChemistryContent.sections.length} videos)</span>
                      <button
                        onClick={resetProgress}
                        className="ml-4 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        Reset Progress
                      </button>
                    </div>
                    {currentVideoIndex === totalVideos - 1 ? (
                      <button
                        onClick={handleCompleteCourse}
                        disabled={isCourseCompleted}
                        className={`px-6 py-2 rounded-full font-semibold ${
                          isCourseCompleted 
                            ? 'bg-green-200 text-green-800 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        Complete Course
                      </button>
                    ) : (
                      <button
                        onClick={handleNextVideo}
                        className="px-6 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Next Video
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 h-[500px] rounded-lg flex items-center justify-center">
                  <p>Select a lesson to begin</p>
                </div>
              )}
            </div>

            {/* Course Materials */}
            <div className="bg-white rounded-[20px] p-6 shadow-custom">
              <h2 className="text-xl font-semibold mb-4">Course Materials</h2>
              {basicChemistryContent.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium mb-2">{section.title}</h3>
                  <div className="space-y-2">
                    {section.materials.map((material, idx) => (
                      <a
                        key={idx}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                          />
                        </svg>
                        <span>{material.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
