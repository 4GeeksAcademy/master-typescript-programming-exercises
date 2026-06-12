"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countAllCharacters(str) {
    const count = {};
    for (let c of str) {
        if (count[c])
            count[c]++;
        else
            count[c] = 1;
    }
    return count;
}
