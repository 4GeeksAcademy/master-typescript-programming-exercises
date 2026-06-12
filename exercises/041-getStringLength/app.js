"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStringLength(string) {
    // your code here
    return string.split('').reduce(a => ++a, 0);
}
