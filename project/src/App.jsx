import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NumberSelector } from './components/NumberGrid/NumberSelector';
import { ResultDisplay } from './components/Results/ResultDisplay';
import { TargetSizeSelector } from './components/Controls/TargetSizeSelector';
import { MaxCombinationsInput } from './components/Controls/MaxCombinationsInput';
import { DrawInput } from './components/DrawComparison/DrawInput';
import { ComparisonResults } from './components/DrawComparison/ComparisonResults';
import { reduceNumbers } from './utils/kenoReducer';
import { compareWithDraw, getMatchStatistics } from './utils/compareResults';
import { KENO_CONFIG } from './constants/kenoConstants';

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [targetSize, setTargetSize] = useState(KENO_CONFIG.MIN_TARGET_SIZE);
  const [maxCombinations, setMaxCombinations] = useState(KENO_CONFIG.DEFAULT_MAX_COMBINATIONS);
  const [combinations, setCombinations] = useState([]);
  const [drawNumbers, setDrawNumbers] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const handleNumberClick = (number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      if (prev.length >= KENO_CONFIG.MAX_NUMBERS) {
        toast.warning(`Maximum ${KENO_CONFIG.MAX_NUMBERS} numéros peuvent être sélectionnés`);
        return prev;
      }
      return [...prev, number];
    });
  };

  const handleGenerate = () => {
    if (selectedNumbers.length < targetSize) {
      toast.error('Vous devez sélectionner plus de numéros que la taille cible');
      return;
    }

    try {
      const result = reduceNumbers(selectedNumbers, targetSize, maxCombinations);
      setCombinations(result);
      setComparisonResults([]);
      setStatistics([]);
      toast.success(`${result.length} combinaisons générées`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDrawCompare = () => {
    if (!combinations.length) {
      toast.error('Générez d\'abord des combinaisons');
      return;
    }
    if (drawNumbers.length === 0) {
      toast.error('Entrez les numéros du tirage');
      return;
    }

    const results = compareWithDraw(combinations, drawNumbers);
    const stats = getMatchStatistics(results);
    setComparisonResults(results);
    setStatistics(stats);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Réducteur Keno</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <TargetSizeSelector 
              targetSize={targetSize}
              onChange={setTargetSize}
            />
            <MaxCombinationsInput
              value={maxCombinations}
              onChange={setMaxCombinations}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Sélectionnez vos numéros ({selectedNumbers.length} sélectionnés)
            </h2>
            <NumberSelector
              selectedNumbers={selectedNumbers}
              onNumberClick={handleNumberClick}
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Générer les combinaisons
          </button>
        </div>

        {combinations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Comparaison avec le tirage</h2>
            <DrawInput
              drawNumbers={drawNumbers}
              onChange={setDrawNumbers}
            />
            <button
              onClick={handleDrawCompare}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Comparer avec le tirage
            </button>
          </div>
        )}

        {comparisonResults.length > 0 ? (
          <ComparisonResults
            results={comparisonResults}
            statistics={statistics}
          />
        ) : (
          <ResultDisplay combinations={combinations} />
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}