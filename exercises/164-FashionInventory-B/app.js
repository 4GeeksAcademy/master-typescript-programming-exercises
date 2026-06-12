"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderAverageCostPerDesigner(inventory) {
    // your code here
    const result = [];
    for (const item of inventory) {
        const { name, shoes } = item;
        let shoeTotal = 0;
        for (const { name: shoe, price } of shoes) {
            shoeTotal += price;
        }
        result.push({ name, averagePrice: shoeTotal / shoes.length });
    }
    return result;
}
