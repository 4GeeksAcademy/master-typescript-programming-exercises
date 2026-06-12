function joinArrayOfArrays(arr: any[]): unknown[] {
  // your code here
  return arr.reduce((a,e)=>Array.isArray(e) ? [...a, ...joinArrayOfArrays(e)]:[...a, e], []);
}

export {};
