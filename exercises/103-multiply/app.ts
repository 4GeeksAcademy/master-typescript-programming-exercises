function multiply(num1: number, num2: number): number {
  // your code here
  let result = 0
  const isNeg = (num1 < 0) !== (num2 < 0) && num1 !==0 && num2 !==0;
  for (let i = 0; i < Math.abs(num2); i++){
    result+= Math.abs(num1)
  }
  return isNeg ? -result : result
}

export {};
