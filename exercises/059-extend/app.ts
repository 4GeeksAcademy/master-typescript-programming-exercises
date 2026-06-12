function extend(obj1: Record<string, unknown>, obj2: Record<string, unknown>): Record<string, unknown> {
  // your code here
  for (let pro in obj2){
    if (!(pro in obj1)){
      obj1[pro] = obj2[pro]
    }
  }
  return obj1
}

export {};
