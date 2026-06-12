interface Shoe {
  name: string;
  price: number;
}

interface InventoryItem {
  name: string;
  shoes: Shoe[];
}
type FuncRType = {name: string, averagePrice: number}[]

function renderAverageCostPerDesigner(inventory: InventoryItem[]): FuncRType {
  // your code here
  const result: FuncRType = []
  for (const item of inventory){
    const {name, shoes} = item;
    let shoeTotal = 0
    for (const {name: shoe, price} of shoes){
      shoeTotal+=price
    }
    result.push({name, averagePrice: shoeTotal/shoes.length})
  }
  return result;
}

export {};
