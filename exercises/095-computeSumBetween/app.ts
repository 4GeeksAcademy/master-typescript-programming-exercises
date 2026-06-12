function computeSumBetween(num1: number, num2: number): number {
  // your code here
  if (num1>num2) return 0
  let result = 0;
  for (let i = num1; i < num2; i++){
    result+=i
  }
  return result
}

export {};
