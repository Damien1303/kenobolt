import React from 'react';
import { NumberButton } from './NumberButton';
import { KENO_CONFIG } from '../../constants/kenoConstants';

export function NumberSelector({ selectedNumbers, onNumberClick }) {
  return (
    <div className="grid grid-cols-10 gap-2 p-4">
      {Array.from({ length: KENO_CONFIG.MAX_NUMBERS }, (_, i) => i + 1).map(number => (
        <NumberButton
          key={number}
          number={number}
          selected={selectedNumbers.includes(number)}
          onClick={onNumberClick}
        />
      ))}
    </div>
  );
}