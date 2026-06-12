function keep(arr: number[], keeper: number): number[] {
  // your code here
  const result = []
  for (let i = 0; i < arr.length; i++){
    if (arr[i] === keeper){
      result.push(arr[i])
    }
  }
  return result;
}

export {};
