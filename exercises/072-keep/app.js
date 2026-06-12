"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function keep(arr, keeper) {
    // your code here
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === keeper) {
            result.push(arr[i]);
        }
    }
    return result;
}
