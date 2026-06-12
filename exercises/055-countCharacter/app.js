"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countCharacter(str, char) {
    // your code here
    return str.split('').reduce((a, b) => b === char ? ++a : a, 0);
}
