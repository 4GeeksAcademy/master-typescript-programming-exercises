function getMatrixValue(matrix: unknown[][], row: number, col: number) {
  // your code here
  if (row > matrix.length || col > matrix[row].length) return undefined
  return matrix[row][col];
}

export {};
