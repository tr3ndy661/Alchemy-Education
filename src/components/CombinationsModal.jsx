import React from "react";

const knownCombinations = [
  {
    elements: ["H", "O"],
    result: "H2O (Water)",
    description:
      "Two hydrogen atoms combine with one oxygen atom to form water.",
  },
  {
    elements: ["Na", "Cl"],
    result: "NaCl (Table Salt)",
    description: "Sodium and chlorine combine to form common table salt.",
  },
  {
    elements: ["C", "O2"],
    result: "CO2 (Carbon Dioxide)",
    description: "Carbon combines with oxygen to form carbon dioxide.",
  },
  {
    elements: ["H", "Cl"],
    result: "HCl (Hydrochloric Acid)",
    description: "Hydrogen and chlorine form hydrochloric acid.",
  },
  {
    elements: ["Fe", "O2"],
    result: "Fe2O3 (Iron Oxide/Rust)",
    description: "Iron combines with oxygen to form rust.",
  },
];

const CombinationsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2A3335]">
            Known Combinations
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {knownCombinations.map((combo, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#4743EF] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                {combo.elements.map((element, i) => (
                  <React.Fragment key={i}>
                    <span className="bg-[#4743EF]/10 px-3 py-1 rounded-lg font-bold text-[#4743EF]">
                      {element}
                    </span>
                    {i < combo.elements.length - 1 && (
                      <span className="text-gray-500">+</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="mx-4">→</span>
                <span className="font-bold text-[#4743EF]">{combo.result}</span>
              </div>
              <p className="text-gray-600 text-sm">{combo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinationsModal;
