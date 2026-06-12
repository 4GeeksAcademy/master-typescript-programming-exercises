function computeFactorialOfN(n: number): number {
  // your code here
  let result = 1;
  for (let i = 2; i <= n; i++){
    result*=i
  }
  return result
}

export {};
