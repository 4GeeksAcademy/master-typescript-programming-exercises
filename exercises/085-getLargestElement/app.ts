function getLargestElement(arr: number[]): number {
  // your code here
  return arr.length ? arr.reduce((a,e)=>!a?e:e>a?e:a) : 0;
}

export {};
