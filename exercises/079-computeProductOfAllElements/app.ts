function computeProductOfAllElements(arr: number[]): number {
  // your code here
  return arr.length ? arr.reduce((a,e,i)=>a*e) : 0;
}

export {};
