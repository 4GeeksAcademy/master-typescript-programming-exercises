function getSmallestElementAtProperty(obj: Record<string, unknown>, key: string) {
  // your code here
  return Array.isArray(obj[key]) && obj[key].length ? obj[key].reduce((a,e)=>e < a ? e : a) : [];
}

export {};
