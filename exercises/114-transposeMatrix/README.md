# `114` transposeMatrix

## 📝 Instructions:

1. Write a function called `transposeMatrix`. Given a matrix (a two-dimensional array), `transposeMatrix` returns its **transpose**: rows become columns and columns become rows.

## 📎 Example:

```ts
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
let output = transposeMatrix(matrix);
console.log(output); // --> [[1, 4], [2, 5], [3, 6]]
```

## 💡 Hints:

+ The first row of the original matrix becomes the first column of the result.
+ You can build each new row by collecting values from the same column index across all original rows.
