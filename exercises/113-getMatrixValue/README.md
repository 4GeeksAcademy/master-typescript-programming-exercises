# `113` getMatrixValue

## 📝 Instructions:

1. Write a function called `getMatrixValue`. Given a matrix (a two-dimensional array), a row index, and a column index, `getMatrixValue` returns the value stored at that position.

2. If the row or column does not exist, the function must return `undefined`.

## 📎 Example:

```ts
let matrix = [
  [1, 2],
  [3, 4],
];
let output = getMatrixValue(matrix, 1, 0);
console.log(output); // --> 3
```

```ts
let output = getMatrixValue(matrix, 4, 0);
console.log(output); // --> undefined
```

## 💡 Hints:

+ A matrix is an array of arrays: `matrix[row][col]`.
+ Check that the row exists before reading the column.
