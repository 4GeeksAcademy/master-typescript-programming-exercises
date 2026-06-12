"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLengthOfLongestElement(arr) {
    // your code here
    return arr.reduce((a, b) => b.length > a ? b.length : a, 0);
}
