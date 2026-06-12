"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllKeys(obj) {
    // your code here
    const keys = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}
