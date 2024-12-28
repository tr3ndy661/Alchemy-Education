import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    photoURL: null,
    joinDate: '',
    coursesCompleted: 0
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      // Format join date
      const joinDate = new Date(user.metadata.creationTime);
      const formattedDate = joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      setUserInfo({
        displayName: user.displayName || 'User',
        email: user.email,
        photoURL: user.photoURL,
        joinDate: formattedDate,
        coursesCompleted: 0 // Replace with actual data from your database
      });
    }
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      onClose();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 ${
          isOpen ? 'block' : 'hidden'
        }`}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 10 }}
        className="fixed top-0 right-0 h-full w-80 bg-white/80 backdrop-blur-xl border-l border-black/10 shadow-xl z-50"
      >
        <div className="p-6 flex flex-col h-full">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {userInfo.photoURL ? (
                  <img 
                    src={userInfo.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                    {userInfo.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-[#4743EF] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#2A3335]">{userInfo.displayName}</h3>
              <p className="text-gray-500 text-sm">{userInfo.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4 mb-8">
            <div className="bg-white/50 rounded-lg p-4 border border-black/10">
              <p className="text-sm text-gray-500">Courses Completed</p>
              <p className="text-2xl font-bold text-[#4743EF]">{userInfo.coursesCompleted}</p>
            </div>
            
            <div className="bg-white/50 rounded-lg p-4 border border-black/10">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-base font-medium text-[#2A3335]">{userInfo.joinDate}</p>
            </div>
          </div>

          {/* Add Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto mb-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default UserSidebar;
