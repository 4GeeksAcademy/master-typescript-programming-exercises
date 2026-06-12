function transformFirstAndLast(array: unknown[]): Record<string, unknown> {
  // your code here
  return {[array[0] as string]: array[array.length-1]}
}

export {};
