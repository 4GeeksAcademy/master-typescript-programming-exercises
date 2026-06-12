function computeSummationToN(n: number): number {
  // your code here
  let result = 0;
  for (let i = 1; i <= n; i++){
    result+=i;
  }
  return result
}

export {};
