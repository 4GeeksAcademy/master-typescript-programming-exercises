"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateBillTotal(preTaxAndTipAmount) {
    // your code here
    return preTaxAndTipAmount * 1.095 + preTaxAndTipAmount * 0.15;
}
