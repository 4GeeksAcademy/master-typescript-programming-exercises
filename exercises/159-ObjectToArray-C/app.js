"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertObjectToList(obj) {
    // your code here
    const result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push([key, obj[key]]);
        }
    }
    return result;
}
