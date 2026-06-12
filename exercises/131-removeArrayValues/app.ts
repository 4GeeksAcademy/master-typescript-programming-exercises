function removeArrayValues(obj: Record<string, unknown>): Record<string, unknown> {
  // your code here
  for (const key in obj){
    if (Array.isArray(obj[key])){
      delete obj[key]
    }
  }
  return obj as Record<string, unknown>;
}

export {};
