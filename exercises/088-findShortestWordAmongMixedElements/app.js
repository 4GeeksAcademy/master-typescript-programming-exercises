"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findShortestWordAmongMixedElements(arr) {
    // your code here
    return arr.length ? String(arr.reduce((a, e) => typeof e === 'string' && typeof a === 'string' ? !a.length ? e : e.length < a.length ? e : a : a, '')) : '';
}
