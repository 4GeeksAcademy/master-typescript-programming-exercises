# `114` transposeMatrix

## 📝 Instrucciones:

1. Escribe una función llamada `transposeMatrix`. Dada una matriz (un array bidimensional), `transposeMatrix` devuelve su **transpuesta**: las filas pasan a ser columnas y las columnas pasan a ser filas.

## 📎 Ejemplo:

```ts
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
let output = transposeMatrix(matrix);
console.log(output); // --> [[1, 4], [2, 5], [3, 6]]
```

## 💡 Pistas:

+ La primera fila de la matriz original se convierte en la primera columna del resultado.
+ Puedes construir cada fila nueva recogiendo los valores de la misma columna en todas las filas originales.
