function listAllValues(obj: Record<string, unknown>): string[] {
  // your code here
  const values = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  
  return values;
}

export {};
