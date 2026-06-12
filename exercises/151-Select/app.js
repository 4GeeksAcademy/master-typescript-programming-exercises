"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function select(arr, obj) {
    const result = {};
    for (let i of arr) {
        if (obj[i])
            result[i] = obj[i];
    }
    return result;
}
