function calculateBillTotal(preTaxAndTipAmount: number): number {
  // your code here
  return preTaxAndTipAmount*1.095+preTaxAndTipAmount*0.15;
}

export {};
