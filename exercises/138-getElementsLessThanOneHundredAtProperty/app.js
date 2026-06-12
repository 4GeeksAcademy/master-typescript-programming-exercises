"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementsLessThan100AtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key].filter(a => a < 100) : [];
}
