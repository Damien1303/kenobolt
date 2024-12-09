import React from 'react';
import clsx from 'clsx';

export function NumberButton({ number, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(number)}
      className={clsx(
        'p-2 rounded-full w-10 h-10 text-center transition-colors',
        selected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
      )}
    >
      {number}
    </button>
  );
}