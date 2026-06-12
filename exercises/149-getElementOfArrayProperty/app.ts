function getElementOfArrayProperty(obj: Record<string, unknown>, key: string, index: number) {
  // your code here
  return Array.isArray(obj[key]) && obj[key].length ? obj[key][index] : undefined;
}

export {};
