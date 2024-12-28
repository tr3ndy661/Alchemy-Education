import React, { useState } from 'react';
import { authAPI } from '../firebase/auth';
import AnimatedButton from './animated-button';
import { setupUserInDB } from '../firebase/db-setup';
import { updateProfile } from 'firebase/auth';

const SignupForm = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');  // Add error state
  const [success, setSuccess] = useState('');  // Add success state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Register the user with Firebase Auth
      const authResult = await authAPI.registerUser(formData.email, formData.password);
      
      if (authResult.error) {
        throw new Error(authResult.error);
      }

      // First update the user's profile with displayName
      await updateProfile(authResult.user, {
        displayName: formData.username
      });

      // Then create user profile in database
      await setupUserInDB(authResult.user.uid, {
        email: formData.email,
        username: formData.username,
        displayName: formData.username // Make sure this is saved in the database
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        onBackToLogin({
          email: formData.email,
          password: formData.password
        });
      }, 2000);  // Redirect after 2 seconds

    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
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

  return (
    <div className="animate-slideIn">
      <h2 className="text-2xl font-semibold text-gray-700">Create Account</h2>
      <p className="text-gray-500 mt-2">Please fill in your details</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4743EF] focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4743EF] focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
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
            className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4743EF] focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-5 bg-transparent border-2 border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4743EF] focus:border-[#4743EF] transition-all duration-200 text-gray-800 shadow-custom hover:border-[#4743EF]"
            placeholder="Confirm your password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}

        <AnimatedButton 
          text={success ? "Success!" : "Create your Account"} 
          isSubmitting={isSubmitting} 
        />
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <button onClick={onBackToLogin} className="text-blue-600 hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
