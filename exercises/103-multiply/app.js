"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function multiply(num1, num2) {
    // your code here
    let result = 0;
    const isNeg = (num1 < 0) !== (num2 < 0) && num1 !== 0 && num2 !== 0;
    for (let i = 0; i < Math.abs(num2); i++) {
        result += Math.abs(num1);
    }
    return isNeg ? -result : result;
}
