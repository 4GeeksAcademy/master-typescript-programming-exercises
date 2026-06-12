function getAllElementsButNth(array: unknown[], n: number): unknown[] {
  // your code here
  const result = []
  for (let i = 0; i < array.length; i++){
    if (i !== n){
      result.push(array[i])
    }
  }
  return result
}

export {};
