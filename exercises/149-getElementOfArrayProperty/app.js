"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementOfArrayProperty(obj, key, index) {
    // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key][index] : undefined;
}
