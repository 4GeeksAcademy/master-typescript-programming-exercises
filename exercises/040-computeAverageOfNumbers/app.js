"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeAverageOfNumbers(nums) {
    // your code here
    return nums.reduce((a, b) => a + b, 0) / nums.length || 0;
}
