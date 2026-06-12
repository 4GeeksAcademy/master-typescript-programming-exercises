function findShortestWordAmongMixedElements(arr: unknown[]): string {
  // your code here
  return arr.length ? String(arr.reduce((a,e)=> typeof e === 'string' && typeof a === 'string'? !a.length ? e : e.length < a.length? e: a: a,'')):'';
}

export {};
