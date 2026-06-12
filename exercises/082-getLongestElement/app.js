"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLongestElement(arr) {
    // your code here
    return arr.reduce((a, e) => e.length > a.length ? e : a, '');
}
