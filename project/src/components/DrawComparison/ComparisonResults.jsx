import React from 'react';
import clsx from 'clsx';

export function ComparisonResults({ results, statistics }) {
  if (!results.length) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Statistiques des correspondances</h3>
        <div className="space-y-2">
          {statistics.map(({ matchCount, combinations, percentage }) => (
            <div key={matchCount} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{matchCount} numéros: {combinations} combinaison(s)</span>
              <span className="text-gray-600">({percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Détail des combinaisons</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {results.map(({ combination, matches, matchCount }, index) => (
            <div key={index} className="p-2 border-b border-gray-200 last:border-b-0">
              <div className="flex flex-wrap gap-2">
                {combination.map((number, idx) => (
                  <span
                    key={idx}
                    className={clsx(
                      'inline-block w-8 h-8 rounded-full text-center leading-8',
                      matches.includes(number)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    )}
                  >
                    {number}
                  </span>
                ))}
                <span className="ml-auto font-semibold">
                  {matchCount} match{matchCount > 1 ? 'es' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}