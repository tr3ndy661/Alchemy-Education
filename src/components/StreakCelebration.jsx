import React, { useEffect } from 'react';
import './StreakCelebration.css';

const StreakCelebration = ({ streak, isVisible, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="streak-celebration">
      <div className="streak-content">
        <div className="streak-icon">🔥</div>
        <div className="streak-count">{streak}</div>
        <div className="streak-text">Day Streak</div>
        <div className="streak-message">
          {streak >= 30 ? "Amazing! A whole month of dedication!" :
           streak >= 7 ? "Fantastic week-long streak!" :
           "Keep up the great work!"}
        </div>
      </div>
    </div>
  );
};

export default StreakCelebration;
