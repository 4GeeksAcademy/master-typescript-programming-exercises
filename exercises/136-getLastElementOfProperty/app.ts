function getLastElementOfProperty(obj: Record<string, unknown>, key: string) {
  // your code here
  return Array.isArray(obj[key]) ? obj[key][obj[key].length-1] : undefined
}

export {};
