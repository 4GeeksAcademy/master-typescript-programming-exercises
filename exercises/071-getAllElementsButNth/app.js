"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllElementsButNth(array, n) {
    // your code here
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i !== n) {
            result.push(array[i]);
        }
    }
    return result;
}
