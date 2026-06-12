type FuncRType = {[key:string]: string | number}
function transformEmployeeData(array: unknown[]): FuncRType[] {
  // your code here
  return (array as string[][]).reduce((a,e)=> {
    const employee: FuncRType = {}
    e.forEach(([k,v]) => { employee[k] = v })
    return [...a, employee]
  }, [] as FuncRType[])
}

export {};
