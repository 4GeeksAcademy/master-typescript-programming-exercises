type FuncRType = (string | number)[][]
type ShoeListType = {
  name: string,
  shoes: {name: string, price: number}[]
}[]

function renderInventory(shoeList: ShoeListType): FuncRType {
  // your code here
  const result: FuncRType = []
  for (const {name, shoes} of shoeList){
    for (const {name: shoe, price} of shoes){
      if (shoe.includes('black')){
        result.push([name, shoe, price])
      }
    }
  }
  return result;
}

export {};
