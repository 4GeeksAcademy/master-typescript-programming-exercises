"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEvenLengthWordsAtProperty(obj, key) {
    // your code here
    return Array.isArray(obj[key]) ? obj[key].filter(a => a.length % 2 === 0) : [];
}
