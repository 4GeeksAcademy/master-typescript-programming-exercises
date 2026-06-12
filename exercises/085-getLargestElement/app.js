"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLargestElement(arr) {
    // your code here
    return arr.length ? arr.reduce((a, e) => !a ? e : e > a ? e : a) : 0;
}
