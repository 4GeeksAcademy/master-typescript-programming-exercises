function isOddWithoutModulo(num: number): boolean {
  // your code here
  return Math[num < 0 ? 'ceil' : 'floor'](num/2) !== num/2;
}

export {};
