function countCharacter(str: string, char: string): number {
  // your code here
  return str.split('').reduce((a,b)=>b === char ? ++a : a,0);
}

export {};
