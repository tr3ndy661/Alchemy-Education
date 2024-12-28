import React, { useState, useEffect } from 'react';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { MdOutlineSchool, MdSchool } from 'react-icons/md';
import { FaFlask } from 'react-icons/fa';
import { RiFireLine } from 'react-icons/ri';
import Lightning from './icons/Lightning';
import UserSidebar from './UserSidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = ({ onSectionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [streak, setStreak] = useState(0);

  // Update active tab logic
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/course/')) return 'courses';
    if (path === '/lab') return 'lab';
    return 'dashboard';
  });

  // Update active tab when location or currentSection changes
  useEffect(() => {
    const path = location.pathname;
    let newActiveTab = 'dashboard';
    
    if (path.includes('/course/')) {
      newActiveTab = 'courses';
    } else if (path === '/lab') {
      newActiveTab = 'lab';
    } else if (location.state?.activeTab) {
      newActiveTab = location.state.activeTab;
    }
    
    setActiveTab(newActiveTab);
  }, [location]);

  // Simulate streak check/update (replace with actual Firebase logic)
  useEffect(() => {
    const checkStreak = () => {
      const lastLogin = localStorage.getItem('lastLogin');
      const currentDate = new Date().toDateString();
      
      if (lastLogin !== currentDate) {
        localStorage.setItem('lastLogin', currentDate);
        const currentStreak = Number(localStorage.getItem('streak') || 0);
        localStorage.setItem('streak', currentStreak + 1);
        setStreak(currentStreak + 1);
      } else {
        setStreak(Number(localStorage.getItem('streak') || 0));
      }
    };

    checkStreak();
  }, []);

  const handleNavigation = (section) => {
    setActiveTab(section);
    onSectionChange(section);
    
    // Update URL without page reload
    const newPath = section === 'dashboard' ? '/dashboard' : `/${section}`;
    navigate(newPath, { state: { activeTab: section } });
  };

  const handleSectionChange = (section) => {
    // Only change section if explicitly clicked in nav
    onSectionChange(section);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 py-3 z-50">
        <div className="w-full px-[100px]">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold text-gray-800">Alchemy</h1>
              <div className="flex items-center">
                <NavItem 
                  icon={activeTab === 'dashboard' ? <AiFillHome size={24} /> : <AiOutlineHome size={24} />}
                  text="Home" 
                  isActive={activeTab === 'dashboard'}
                  onClick={() => handleNavigation('dashboard')}
                />
                <NavItem 
                  icon={activeTab === 'courses' ? <MdSchool size={24} /> : <MdOutlineSchool size={24} />}
                  text="Courses" 
                  isActive={activeTab === 'courses'}
                  onClick={() => handleNavigation('courses')}
                />
                <NavItem 
                  icon={activeTab === 'lab' ? <FaFlask size={24} className="text-[#4743EF]" /> : <FaFlask size={24} />}
                  text="Lab" 
                  isActive={activeTab === 'lab'}
                  onClick={() => handleNavigation('lab')}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border-2 border-black/20 rounded-full px-4 py-2">
                <Lightning className="w-5 h-5 stroke-[#FFC107] fill-[#FFC107] mr-2" />
                <span className="text-[#2A3335] font-medium">{streak}</span>
              </div>

              <button 
                className="relative w-8 h-8 focus:outline-none"
                onClick={() => setIsSidebarOpen(true)}
              >
                <div className="flex flex-col justify-center h-full space-y-1.5">
                  <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 w-6 bg-gray-600 transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <UserSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

const NavItem = ({ icon, text, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-row items-center gap-1 px-2 py-1 ${
        isActive 
          ? 'text-[#4743EF]' 
          : 'text-gray-500 hover:text-[#4743EF]'
      } transition-colors duration-200 relative`}
    >
      <div className="flex items-center gap-1 mb-2">
        {icon}
        <span className="text-base font-medium">{text}</span>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4743EF] rounded-full" />
      )}
    </button>
  );
};

export default NavBar;

