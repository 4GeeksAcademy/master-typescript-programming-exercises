"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLastElementOfProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key][obj[key].length - 1] : undefined;
}
