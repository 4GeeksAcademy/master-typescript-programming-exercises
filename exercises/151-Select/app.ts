function select(arr: string[], obj: Record<string, unknown>) {
  const result:{[key:string]: number} = {}
    for (let i of arr){
      if (obj[i]) result[i] = obj[i] as number
    }  
  return result
}

export {};
