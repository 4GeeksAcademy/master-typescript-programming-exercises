function countNumberOfKeys(obj: Record<string, unknown>): number {
  // your code here
  let count = 0
  for (const key in obj){
    count++
  }
  return count;
}

export {};
