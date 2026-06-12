"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeSumBetween(num1, num2) {
    // your code here
    if (num1 > num2)
        return 0;
    let result = 0;
    for (let i = num1; i < num2; i++) {
        result += i;
    }
    return result;
}
