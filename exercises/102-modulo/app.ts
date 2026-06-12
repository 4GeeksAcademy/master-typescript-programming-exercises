function modulo(num1: number, num2: number): number {
  // your code here
  if (isNaN(num1) || isNaN(num2)) return NaN;
  const isNeg = num1 < 0 || num2 < 0 && !(num1 < 0 && num2 < 0)

  const result = num1 - Math[isNeg ? 'ceil' : 'floor'](num1/num2) * num2
  return result
}

export {};
