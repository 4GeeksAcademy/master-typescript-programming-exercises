function getAllKeys(obj: Record<string, unknown>): string[] {
  // your code here
  const keys = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  
  return keys;
}

export {};
