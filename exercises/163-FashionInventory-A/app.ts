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
  return [];
}

export {};
