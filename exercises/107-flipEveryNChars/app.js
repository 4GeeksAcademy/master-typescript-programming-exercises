"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flipEveryNChars(input, n) {
    // your code here
    let result = '';
    for (let i = 0; i < input.length; i += n) {
        result += input.substring(i, i + n).split('').reverse().join('');
    }
    return result;
}
