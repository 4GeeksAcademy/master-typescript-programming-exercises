"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAverageOfElementsAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key].reduce((a, e) => a + e) / obj[key].length : 0;
}
