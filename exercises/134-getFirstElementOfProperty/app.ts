function getFirstElementOfProperty(obj: Record<string, unknown>, key: string) {
  // your code here
  return Array.isArray(obj[key]) ? obj[key][0] : undefined
}

export {};
