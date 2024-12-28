import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../firebase/auth';
import AnimatedButton from './animated-button'
import AnimatedBackground from './AnimatedBackground'
import SignupForm from './SignupForm'

const LoginSignup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await authAPI.loginUser(formData.email, formData.password);
      if (result.error) {
        // Check for specific Firebase error codes
        if (result.error.code === 'auth/user-not-found') {
          setError('Account does not exist');
        } else if (result.error.code === 'auth/wrong-password') {
          setError('Error with credentials, please try again');
        } else {
          setError('Error with credentials, please try again');
        }
      } else {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Account does not exist');
      } else {
        setError('Error with credentials, please try again');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackToLogin = (credentials) => {
    if (credentials) {
      setFormData({
        email: credentials.email,
        password: credentials.password
      });
    }
    setIsLogin(true);
  };

  return (
    <div className="flex h-screen bg-transparent">
      <div className="w-5/6 bg-gray-800 relative">
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-black/20 to-transparent z-10"></div>
        <img 
          src="src/photos/3675319.jpg" 
          alt="login" 
          className="w-full h-full object-fit opacity-80"
        />
      </div>
      
      <div className="w-1/2 flex flex-col px-16 justify-center bg-white relative">
        <AnimatedBackground />
        <div className="w-full max-w-md mx-auto z-10">
          <h1 className="text-4xl font-bold text-gray-800 absolute top-4 left-4">Alchemy</h1>
          
          <div className="space-y-6">
            {isLogin ? (
              <div className="animate-slideIn">
                <h2 className="text-3xl font-bold text-center text-gray-700">Log in</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full  focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                    <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
                      placeholder="Enter your password"
                    />
                  </div>
                  
                  <AnimatedButton isSubmitting={isSubmitting} />
                  {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </form>
                
                <p className="text-center text-sm text-gray-500 mt-6">
                  Don&apos;t have an account?{' '}
                  <button 
                    onClick={() => setIsLogin(false)} 
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            ) : (
              <SignupForm onBackToLogin={handleBackToLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup

