function getMatrixValue(matrix, row, col) {
  if (!matrix[row]) return undefined;
  return matrix[row][col];
}

let matrix = [
  [1, 2],
  [3, 4],
];
console.log(getMatrixValue(matrix, 1, 0)); // --> 3
