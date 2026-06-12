"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLengthOfShortestElement(arr) {
    // your code here
    return arr.length ? arr.reduce((a, e) => e.length < a ? e.length : a, Infinity) : 0;
}
