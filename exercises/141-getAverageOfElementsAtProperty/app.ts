function getAverageOfElementsAtProperty(obj: Record<string, unknown>, key: string): number {
  // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key].reduce((a,e)=>a+e)/obj[key].length : 0;
}

export {};
