"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderInventory(shoeList) {
    // your code here
    const result = [];
    for (const { name, shoes } of shoeList) {
        for (const { name: shoe, price } of shoes) {
            if (shoe.includes('black')) {
                result.push([name, shoe, price]);
            }
        }
    }
    return result;
}
