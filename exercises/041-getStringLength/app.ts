function getStringLength(string: string): number {
  // your code here
  return string.split('').reduce(a=>++a,0);
}

export {};
