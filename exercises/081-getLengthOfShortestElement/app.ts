function getLengthOfShortestElement(arr: string[]): number {
  // your code here
  return arr.length ? arr.reduce((a,e)=>e.length<a?e.length:a,Infinity) : 0;
}

export {};
