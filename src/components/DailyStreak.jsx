import { useEffect, useState } from 'react';
import Lightning from './icons/Lightning';

const DailyStreak = () => {
  const [streak, setStreak] = useState(0);
  const [streakDays, setStreakDays] = useState([]);

  useEffect(() => {
    // Get current streak from localStorage or other source
    const currentStreak = Number(localStorage.getItem('streak') || 0);
    setStreak(currentStreak);

    // Generate last 5 days
    const days = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isActive: i >= 5 - currentStreak
      });
    }
    setStreakDays(days);
  }, []);

  return (
    <div className="border border-black/20 rounded-[20px] p-4 hover:border-[#4743EF] transition-colors h-[180px] w-[300px] flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-[#2A3335]">Daily Streak</h2>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-[#2A3335]">{streak}</span>
            <Lightning className="w-5 h-5 stroke-[#FFC107] fill-[#FFC107]" />
          </div>
        </div>
        
        <div className="flex justify-between items-center px-2 gap-[5px]">
          {streakDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`rounded-full p-3 border-2 border-[#2A3335] ${
                day.isActive 
                  ? 'bg-[#FFC107]' 
                  : 'bg-gray-100'
              }`}>
                <Lightning 
                  className={`w-5 h-5 ${
                    day.isActive 
                      ? 'stroke-black fill-black' 
                      : 'stroke-gray-400 fill-none'
                  }`}
                />
              </div>
              <span className={`text-sm font-medium ${
                day.isActive 
                  ? 'text-gray-600' 
                  : 'text-gray-400'
              }`}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <button className="bg-blue-600 text-white rounded-full py-3 px-2 text-lg font-semi-bold hover:bg-blue-700 transition-colors w-full">
        View Streak Details
      </button> */}
    </div>
  );
};

export default DailyStreak;