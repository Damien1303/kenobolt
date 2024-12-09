import React from 'react';
import { KENO_CONFIG } from '../../constants/kenoConstants';

export function MaxCombinationsInput({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Nombre maximum de combinaisons ({KENO_CONFIG.MIN_COMBINATIONS}-{KENO_CONFIG.MAX_COMBINATIONS}):
      </label>
      <input
        type="number"
        min={KENO_CONFIG.MIN_COMBINATIONS}
        max={KENO_CONFIG.MAX_COMBINATIONS}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}