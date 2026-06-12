function findShortestOfThreeWords(word1: string, word2: string, word3: string): string {
  // your code here
  const [w1,w2,w3] = [word1.length, word2.length, word3.length]
  return w1 <= w2 && w1 <= w3 ? word1 : w2 <= w3 ? word2 : word3;
}

export {};
