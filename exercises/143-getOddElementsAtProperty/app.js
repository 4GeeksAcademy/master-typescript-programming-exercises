"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOddElementsAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key].filter(a => a % 2 !== 0) : [];
}
