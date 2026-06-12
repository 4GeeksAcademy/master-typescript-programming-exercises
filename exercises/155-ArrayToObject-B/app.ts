function fromListToObject(array: unknown[]) {
  return (array as string[][]).reduce((a,[k,v])=> {
    a[k] = v
    return a
  }, {} as {[key:string]: string})
}

export {};
