"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeProductOfAllElements(arr) {
    // your code here
    return arr.length ? arr.reduce((a, e, i) => a * e) : 0;
}
