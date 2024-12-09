import React from 'react';
import { KENO_CONFIG } from '../constants/kenoConstants';
import clsx from 'clsx';

export function NumberSelector({ selectedNumbers, onNumberClick }) {
  return (
    <div className="grid grid-cols-10 gap-2 p-4">
      {Array.from({ length: KENO_CONFIG.MAX_NUMBERS }, (_, i) => i + 1).map(number => (
        <button
          key={number}
          onClick={() => onNumberClick(number)}
          className={clsx(
            'p-2 rounded-full w-10 h-10 text-center transition-colors',
            selectedNumbers.includes(number)
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 hover:bg-gray-300'
          )}
        >
          {number}
        </button>
      ))}
    </div>
  );
}