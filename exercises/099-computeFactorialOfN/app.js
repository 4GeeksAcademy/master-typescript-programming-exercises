"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeFactorialOfN(n) {
    // your code here
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
