"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllButLastElementOfProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key].slice(0, obj[key].length - 1) : [];
}
