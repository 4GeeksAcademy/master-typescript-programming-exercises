interface Shoe {
  name: string;
  price: number;
}

interface InventoryItem {
  name: string;
  shoes: Shoe[];
}

function renderAverageCostPerDesigner(inventory: InventoryItem[]): string {
  // your code here
  return '';
}

export {};
