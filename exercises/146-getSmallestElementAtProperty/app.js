"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSmallestElementAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) && obj[key].length ? obj[key].reduce((a, e) => e < a ? e : a) : [];
}
