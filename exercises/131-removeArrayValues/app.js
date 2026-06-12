"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeArrayValues(obj) {
    // your code here
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            delete obj[key];
        }
    }
    return obj;
}
