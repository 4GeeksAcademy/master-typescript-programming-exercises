# `115` binarySearchSortedArray

## 📝 Instrucciones:

1. Escribe una función llamada `binarySearchSortedArray`. Dado un array de números **ordenado** y un valor objetivo, `binarySearchSortedArray` devuelve el **índice** del objetivo si se encuentra.

2. Si el objetivo no está en el array, devuelve `-1`.

## 📎 Ejemplo:

```ts
let output = binarySearchSortedArray([1, 3, 5, 7, 9], 7);
console.log(output); // --> 3
```

```ts
let output = binarySearchSortedArray([1, 3, 5, 7, 9], 2);
console.log(output); // --> -1
```

## 💡 Pistas:

+ La **búsqueda binaria** funciona en arrays ordenados dividiendo repetidamente el rango de búsqueda a la mitad.
+ Usa `Math.floor()` al calcular el índice del punto medio.
+ Compara el valor del punto medio con el objetivo para decidir si buscar en la mitad izquierda o derecha.
