"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEvenWithoutModulo(num) {
    // your code here
    return Math[num < 0 ? 'ceil' : 'floor'](num / 2) === num / 2;
}
