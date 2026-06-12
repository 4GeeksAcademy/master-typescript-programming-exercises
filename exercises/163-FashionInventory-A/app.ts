interface Shoe {
  name: string;
  price: number;
}

interface InventoryItem {
  name: string;
  shoes: Shoe[];
}

function renderInventory(inventory: InventoryItem[]): unknown[][] {
  // your code here
  const result: (string | number)[][] = []
  for (const item of inventory){
    const { name, shoes } = item;
    shoes.forEach(({name: shoe, price}) => result.push([name, shoe, price]))
  }
  return result
}

export {};
