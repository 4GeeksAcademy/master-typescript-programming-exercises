function getElementsThatEqual10AtProperty(obj: Record<string, unknown>, key: string): unknown[] {
  // your code here
  return Array.isArray(obj[key]) ? obj[key].filter(a=>a===10) : [];
}

export {};
