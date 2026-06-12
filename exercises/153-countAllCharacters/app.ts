function countAllCharacters(str: string) {
  const count:{[key:string]: number} = {}
  for (let c of str){
    if (count[c]) count[c]++
    else count[c] = 1
  }
  return count
}

export {};
