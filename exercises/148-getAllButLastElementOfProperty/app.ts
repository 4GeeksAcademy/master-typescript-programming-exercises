function getAllButLastElementOfProperty(obj: Record<string, unknown>, key: string): unknown[] {
  // your code here
return Array.isArray(obj[key]) && obj[key].length ? obj[key].slice(0, obj[key].length-1) : [];
}

export {};
