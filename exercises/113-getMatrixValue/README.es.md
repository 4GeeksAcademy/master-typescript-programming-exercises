# `113` getMatrixValue

## 📝 Instrucciones:

1. Escribe una función llamada `getMatrixValue`. Dada una matriz (un array bidimensional), un índice de fila y un índice de columna, `getMatrixValue` devuelve el valor almacenado en esa posición.

2. Si la fila o la columna no existen, la función debe devolver `undefined`.

## 📎 Ejemplo:

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

## 💡 Pistas:

+ Una matriz es un array de arrays: `matrix[row][col]`.
+ Verifica que la fila exista antes de leer la columna.
