"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLongestWordOfMixedElements(arr) {
    // your code here
    let result = '';
    for (let word of arr) {
        if (typeof word === 'string' && word.length > result.length) {
            result = word;
        }
    }
    return result;
}
