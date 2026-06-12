"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeNumbersLessThan(num, obj) {
    // your code here
    for (const key in obj) {
        if (typeof obj[key] === 'number' && obj[key] < num) {
            delete obj[key];
        }
    }
    return obj;
}
