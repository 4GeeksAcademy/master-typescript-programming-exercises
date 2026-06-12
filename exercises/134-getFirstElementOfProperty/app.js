"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFirstElementOfProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key][0] : undefined;
}
