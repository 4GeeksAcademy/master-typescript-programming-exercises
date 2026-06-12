"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNthElementOfProperty(obj, key, n) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key][n] : undefined;
}
