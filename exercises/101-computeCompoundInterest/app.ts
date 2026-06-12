function computeCompoundInterest(principal: number, interestRate: number, compoundingFrequency: number, timeInYears: number): number {
  const amount = principal * Math.pow(1+(interestRate/compoundingFrequency), compoundingFrequency * timeInYears)
  return amount - principal;
}

export {};
