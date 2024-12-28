import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-full bg-gradient-to-br from-[#1E10C5] to-[#4743EF] opacity-20 blur-[100px]" />
    </div>
  );
};

export default AnimatedBackground;
