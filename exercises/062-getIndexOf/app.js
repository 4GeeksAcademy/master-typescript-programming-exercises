"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIndexOf(char, str) {
    // your code here
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            return i;
        }
    }
    return -1;
}
