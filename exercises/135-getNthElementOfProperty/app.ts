function getNthElementOfProperty(obj: Record<string, unknown>, key: string, n: number) {
  // your code here
  return Array.isArray(obj[key]) ? obj[key][n] : undefined
}

export {};
