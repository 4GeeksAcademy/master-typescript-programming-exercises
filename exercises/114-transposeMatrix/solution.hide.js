function transposeMatrix(matrix) {
  if (!matrix.length) return [];
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(transposeMatrix(matrix)); // --> [[1, 4], [2, 5], [3, 6]]
