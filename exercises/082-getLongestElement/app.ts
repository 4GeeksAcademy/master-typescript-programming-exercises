function getLongestElement(arr: string[]): string {
  // your code here
  return arr.reduce((a,e)=>e.length > a.length ? e : a, '');
}

export {};
