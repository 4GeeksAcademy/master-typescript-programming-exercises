function computeAverageOfNumbers(nums: number[]): number {
  // your code here
  return nums.reduce((a,b)=>a+b, 0)/nums.length || 0;
}

export {};
