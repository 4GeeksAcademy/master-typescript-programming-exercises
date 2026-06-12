function getEvenLengthWordsAtProperty(obj: Record<string, unknown>, key: string): string[] {
  // your code here
  return Array.isArray(obj[key]) ? obj[key].filter(a=>a.length%2===0) : [];
}

export {};
