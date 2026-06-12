function getSquaredElementsAtProperty(obj: Record<string, unknown>, key: string): unknown[] {
  // your code here
  return Array.isArray(obj[key]) ? obj[key].map(a=>a**2) : [];
}

export {};
