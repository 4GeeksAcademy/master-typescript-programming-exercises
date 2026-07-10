interface Shoe {
  name: string;
  price: number;
}

interface InventoryItem {
  name: string;
  shoes: Shoe[];
}

interface Result {
  name: string;
  averagePrice: number;
}

function renderAverageCostPerDesigner(inventory: InventoryItem[]): Result[] {
  // your code here
  return [];
}

export {};
