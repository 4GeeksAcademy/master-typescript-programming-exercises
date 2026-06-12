"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLongestOfThreeWords(word1, word2, word3) {
    // your code here
    const [w1, w2, w3] = [word1.length, word2.length, word3.length];
    return w1 >= w2 && w1 >= w3 ? word1 : w2 >= w3 ? word2 : word3;
}
