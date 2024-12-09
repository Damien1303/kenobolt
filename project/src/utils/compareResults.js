export function compareWithDraw(combinations, drawNumbers) {
  return combinations.map(combination => {
    const matches = combination.filter(num => drawNumbers.includes(num));
    return {
      combination,
      matches,
      matchCount: matches.length
    };
  }).sort((a, b) => b.matchCount - a.matchCount);
}

export function getMatchStatistics(comparisonResults) {
  const stats = new Map();
  comparisonResults.forEach(result => {
    const count = stats.get(result.matchCount) || 0;
    stats.set(result.matchCount, count + 1);
  });
  
  return Array.from(stats.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([matchCount, combinations]) => ({
      matchCount,
      combinations,
      percentage: ((combinations / comparisonResults.length) * 100).toFixed(1)
    }));
}