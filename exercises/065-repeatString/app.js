"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function repeatString(string, num) {
    // your code here
    let result = '';
    for (let i = 0; i < num; i++) {
        result += string;
    }
    return result;
}
