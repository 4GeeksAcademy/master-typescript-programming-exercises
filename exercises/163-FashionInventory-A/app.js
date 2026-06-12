"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderInventory(inventory) {
    // your code here
    const result = [];
    for (const item of inventory) {
        const { name, shoes } = item;
        shoes.forEach(({ name: shoe, price }) => result.push([name, shoe, price]));
    }
    return result;
}
