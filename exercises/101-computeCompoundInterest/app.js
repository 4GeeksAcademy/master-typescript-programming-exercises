"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeCompoundInterest(principal, interestRate, compoundingFrequency, timeInYears) {
    const amount = principal * Math.pow(1 + (interestRate / compoundingFrequency), compoundingFrequency * timeInYears);
    return amount - principal;
}
