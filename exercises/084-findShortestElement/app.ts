function findShortestElement(arr: string[]): string {
  // your code here
  return arr.length?arr.reduce((a,e)=>!a.length? e:e.length<a.length?e:a,''):'';
}

export {};
