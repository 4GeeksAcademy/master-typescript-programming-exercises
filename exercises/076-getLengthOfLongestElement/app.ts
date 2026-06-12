function getLengthOfLongestElement(arr: string[]): number {
  // your code here
  return arr.reduce((a,b)=>b.length > a ? b.length : a, 0);
}

export {};
