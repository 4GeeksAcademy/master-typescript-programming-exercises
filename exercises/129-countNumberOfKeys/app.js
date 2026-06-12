"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countNumberOfKeys(obj) {
    // your code here
    let count = 0;
    for (const key in obj) {
        count++;
    }
    return count;
}
