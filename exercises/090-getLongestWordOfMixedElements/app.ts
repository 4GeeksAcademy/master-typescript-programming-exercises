function getLongestWordOfMixedElements(arr: unknown[]): string {
  // your code here
  let result = ''
  for (let word of arr){
    if (typeof word === 'string' && word.length > result.length){
      result = word
    }
  }
  return result
}

export {};
