"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findLongestPalindrome(sentence) {
    // your code here
    let result = '';
    for (let i = 0; i < sentence.length; i++) {
        let seg = '';
        for (let j = i; j < sentence.length; j++) {
            seg += sentence[j];
            if (isPalindrome(seg) && seg.length > result.length)
                result = seg;
        }
    }
    return result;
}
function reverseString(string) {
    // your code here
    return string.split('').reverse().join('');
}
function isPalindrome(word) {
    // your code here
    return word.length > 1 && word.toLocaleLowerCase() === reverseString(word.toLocaleLowerCase());
}
