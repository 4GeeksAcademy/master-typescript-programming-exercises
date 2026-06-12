"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSquaredElementsAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key].map(a => a ** 2) : [];
}
