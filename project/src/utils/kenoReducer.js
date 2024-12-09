import { KENO_CONFIG } from '../constants/kenoConstants';

export function generateCombinations(numbers, size) {
  const combinations = [];

  function combine(start, combo) {
    if (combo.length === size) {
      combinations.push([...combo]);
      return;
    }

    for (let i = start; i < numbers.length; i++) {
      combo.push(numbers[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  }

  combine(0, []);
  return combinations;
}

export function isValidCombination(combination, originalNumbers, minMatch = KENO_CONFIG.MIN_MATCH) {
  const matches = combination.filter(num => originalNumbers.includes(num));
  return matches.length >= minMatch;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function reduceNumbers(inputNumbers, targetSize, maxCombinations = KENO_CONFIG.DEFAULT_MAX_COMBINATIONS) {
  if (inputNumbers.length < targetSize) {
    throw new Error("Le nombre de numéros d'entrée doit être supérieur à la taille cible");
  }

  if (targetSize < KENO_CONFIG.MIN_TARGET_SIZE || targetSize > KENO_CONFIG.MAX_TARGET_SIZE) {
    throw new Error(`La taille cible doit être entre ${KENO_CONFIG.MIN_TARGET_SIZE} et ${KENO_CONFIG.MAX_TARGET_SIZE}`);
  }

  if (maxCombinations < KENO_CONFIG.MIN_COMBINATIONS || maxCombinations > KENO_CONFIG.MAX_COMBINATIONS) {
    throw new Error(`Le nombre de combinaisons doit être entre ${KENO_CONFIG.MIN_COMBINATIONS} et ${KENO_CONFIG.MAX_COMBINATIONS}`);
  }

  const sortedNumbers = [...inputNumbers].sort((a, b) => a - b);
  let combinations = generateCombinations(sortedNumbers, targetSize)
    .filter(combo => isValidCombination(combo, sortedNumbers, KENO_CONFIG.MIN_MATCH));

  if (combinations.length > maxCombinations) {
    combinations = shuffleArray([...combinations]).slice(0, maxCombinations);
  }
  
  return combinations.sort((a, b) => a[0] - b[0]);
}