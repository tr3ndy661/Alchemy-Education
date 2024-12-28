import React from 'react';

const ReactionDisplay = ({ selectedElements, reaction }) => {
  if (selectedElements.length === 0) return null;

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-lg mb-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-center space-x-4 text-xl">
        {selectedElements.map((element, index) => (
          <React.Fragment key={element.symbol}>
            <div className="flex items-center">
              <div className="bg-[#4743EF]/10 rounded-lg p-3">
                <span className="font-bold text-[#4743EF]">
                  {element.symbol}
                </span>
              </div>
              {index < selectedElements.length - 1 && (
                <span className="mx-2 text-2xl text-gray-600">+</span>
              )}
            </div>
          </React.Fragment>
        ))}
        {reaction && (
          <>
            <span className="mx-4 text-2xl">⟶</span>
            <div className="bg-[#4743EF]/10 rounded-lg p-3">
              <span className="font-bold text-[#4743EF]">{reaction}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReactionDisplay;
