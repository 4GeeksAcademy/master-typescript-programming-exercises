"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertDoubleSpaceToSingle(str) {
    // your code here
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (!(str[i] === ' ' && str[i + 1] === ' ')) {
            result += str[i];
        }
    }
    return result;
}
