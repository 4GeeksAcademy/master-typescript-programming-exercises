function repeatString(string: string, num: number): string {
  // your code here
  let result = ''
  for (let i = 0; i < num; i++){
    result+=string
  }
  return result;
}

export {};
