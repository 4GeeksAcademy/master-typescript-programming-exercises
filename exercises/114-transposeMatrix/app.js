"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transposeMatrix(matrix) {
    // your code here
    return !matrix ? [] : matrix[0].map((_, i) => matrix.map(r => r[i]));
}
