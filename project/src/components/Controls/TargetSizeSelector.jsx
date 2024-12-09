import React from 'react';
import { KENO_CONFIG } from '../../constants/kenoConstants';

export function TargetSizeSelector({ targetSize, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Taille des combinaisons ({KENO_CONFIG.MIN_TARGET_SIZE}-{KENO_CONFIG.MAX_TARGET_SIZE}):
      </label>
      <input
        type="number"
        min={KENO_CONFIG.MIN_TARGET_SIZE}
        max={KENO_CONFIG.MAX_TARGET_SIZE}
        value={targetSize}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}