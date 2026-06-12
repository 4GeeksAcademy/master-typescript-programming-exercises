"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumDigits(num) {
    // your code here
    let n = num.toString();
    let neg = n[0] === '-';
    let result = 0;
    for (let i = neg ? 1 : 0; i < n.length; i++) {
        if (neg && i === 1) {
            result -= Number(n[i]);
        }
        else {
            result += Number(n[i]);
        }
    }
    return result;
}
