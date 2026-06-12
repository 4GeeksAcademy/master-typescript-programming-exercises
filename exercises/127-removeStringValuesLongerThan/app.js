"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeStringValuesLongerThan(num, obj) {
    // your code here
    for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].length > num) {
            delete obj[key];
        }
    }
    return obj;
}
