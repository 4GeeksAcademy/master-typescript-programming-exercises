"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findShortestElement(arr) {
    // your code here
    return arr.length ? arr.reduce((a, e) => !a.length ? e : e.length < a.length ? e : a, '') : '';
}
