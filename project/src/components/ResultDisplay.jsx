import React from 'react';

export function ResultDisplay({ combinations }) {
  if (!combinations.length) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">
        Combinaisons générées ({combinations.length})
      </h3>
      <div className="max-h-96 overflow-y-auto">
        {combinations.map((combo, index) => (
          <div 
            key={index} 
            className="p-2 border-b border-gray-200 last:border-b-0"
          >
            {combo.join(' - ')}
          </div>
        ))}
      </div>
    </div>
  );
}