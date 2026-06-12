function removeStringValuesLongerThan(num: number, obj: Record<string, unknown>): Record<string, unknown> {
  // your code here
  for (const key in obj){
    if (typeof obj[key] === 'string' && obj[key].length > num){
      delete obj[key]
    }
  }
  return obj as Record<string, unknown>;
}

export {};
