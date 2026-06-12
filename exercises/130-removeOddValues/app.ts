function removeOddValues(obj: Record<string, unknown>): Record<string, unknown> {
  // your code here
  for (const key in obj){
    if (typeof obj[key] === 'number' && obj[key] % 2 !== 0){
      delete obj[key]
    }
  }
  return obj as Record<string, unknown>;
}

export {};
