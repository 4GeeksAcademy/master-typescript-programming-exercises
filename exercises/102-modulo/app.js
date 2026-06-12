"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modulo(num1, num2) {
    // your code here
    if (isNaN(num1) || isNaN(num2))
        return NaN;
    const isNeg = num1 < 0 || num2 < 0 && !(num1 < 0 && num2 < 0);
    const result = num1 - Math[isNeg ? 'ceil' : 'floor'](num1 / num2) * num2;
    return result;
}
