function transposeMatrix(matrix: unknown[][]): unknown[][] {
  // your code here
  return !matrix ? [] : matrix[0].map((_, i) => matrix.map(r => r[i]))
}

export {};
