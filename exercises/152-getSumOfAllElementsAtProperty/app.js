"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSumOfAllElementsAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key].reduce((a, e) => a += e) : 0;
}
