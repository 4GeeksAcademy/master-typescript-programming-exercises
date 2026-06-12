"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRotated(str1, str2) {
    // your code here
    if (str1 === str2)
        return true;
    if (!str1)
        return false;
    const s1 = str1.split('');
    for (let i of s1) {
        s1.push(s1.shift());
        if (s1.join('') === str2)
            return true;
    }
    return false;
}
