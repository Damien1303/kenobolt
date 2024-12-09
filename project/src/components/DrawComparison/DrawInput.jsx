import React from 'react';
import { KENO_CONFIG } from '../../constants/kenoConstants';

export function DrawInput({ drawNumbers, onChange }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    const numbers = value
      .split(/[,\s]+/)
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num >= 1 && num <= KENO_CONFIG.MAX_NUMBERS);
    
    onChange(numbers);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Numéros du tirage (séparés par des espaces ou des virgules):
      </label>
      <input
        type="text"
        value={drawNumbers.join(', ')}
        onChange={handleInputChange}
        placeholder="Ex: 1, 2, 3, 4, 5"
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}