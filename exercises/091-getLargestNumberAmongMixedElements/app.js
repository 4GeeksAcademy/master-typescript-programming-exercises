"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLargestNumberAmongMixedElements(arr) {
    // your code here
    let result = -Infinity;
    for (let num of arr) {
        if (typeof num === 'number' && num > result) {
            result = num;
        }
    }
    return result === -Infinity ? 0 : result;
}
