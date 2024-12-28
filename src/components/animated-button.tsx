'use client';
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';  // Using education icon instead of star

const COLORS = {
  primary: '#1E10C5',
  secondary: '#4743EF',
  accent: '#B2B8E7',
};

const AnimatedButton = ({ isSubmitting, text = 'Sign In to Learn' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full flex justify-center'>
      <button
        type='submit'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='relative w-full py-5 rounded-full bg-gradient-to-r from-[#1E10C5] to-[#4743EF] group overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl'
      >
        {/* Animated background effect */}
        <div className='absolute inset-0 opacity-50'>
          <div className={`
            absolute inset-0 transition-transform duration-500 ease-in-out
            bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]
            ${isHovered ? 'scale-[2.5]' : 'scale-0'}
          `} />
        </div>

        {/* Moving particles effect */}
        <div className='absolute inset-0 overflow-hidden'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-16 h-16 bg-white/10 rounded-full
                transition-all duration-1000 ease-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                left: `${(i + 1) * 25}%`,
                top: '50%',
                transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
                transition: `all ${0.5 + i * 0.2}s ease-out`
              }}
            />
          ))}
        </div>

        {/* Button content */}
        <div className='relative flex items-center justify-center gap-3 text-white font-medium'>
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <GraduationCap className={`w-5 h-5 transition-transform duration-300 ${
                isHovered ? 'scale-125 rotate-12' : ''
              }`} />
              <span className={`text-lg tracking-wider transition-all duration-300 ${
                isHovered ? 'tracking-widest' : ''
              }`}>
                {isSubmitting ? 'Please wait...' : text}
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default AnimatedButton;


