"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listAllValues(obj) {
    // your code here
    const values = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            values.push(obj[key]);
        }
    }
    return values;
}
