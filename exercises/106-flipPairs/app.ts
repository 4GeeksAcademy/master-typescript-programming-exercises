function flipPairs(input: string): string {
  // your code here
  let result = ''
  for (let i = 0; i < input.length; i+=2){
    result+=input[i+1] ? input[i+1]+input[i] : input[i]
  }
  return result;
}

export {};
