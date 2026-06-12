"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function joinArrayOfArrays(arr) {
    // your code here
    return arr.reduce((a, e) => Array.isArray(e) ? [...a, ...joinArrayOfArrays(e)] : [...a, e], []);
}
