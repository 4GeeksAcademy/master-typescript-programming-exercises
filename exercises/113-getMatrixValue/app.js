"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMatrixValue(matrix, row, col) {
    // your code here
    if (row > matrix.length || col > matrix[row].length)
        return undefined;
    return matrix[row][col];
}
