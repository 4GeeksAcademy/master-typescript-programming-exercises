function joinArrays(arr1: number[], arr2: number[]): number[] {
  // your code here
  // return [...arr1, ...arr2];
  // return arr1.concat(arr2)
  return ([] as number[]).concat(arr1, arr2)
}

export {};
