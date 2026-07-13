# `170` comparePassByValueAndReference

## 📝 Instrucciones:

1. Escribe una función llamada `comparePassByValueAndReference`. Dado un valor `input`, la función devuelve un objeto `ComparisonResult` con:

   - `original`: el valor de entrada recibido
   - `copy`: una copia del input (para objetos, crea una copia superficial con el operador spread)
   - `sameReference`: `true` si `copy` y `original` apuntan a la misma referencia, de lo contrario `false`

2. Usa la interfaz `ComparisonResult` ya definida en `app.ts`.

## 📎 Ejemplo (objeto — paso por referencia):

```ts
let item = { count: 1 };
let output = comparePassByValueAndReference(item);
console.log(output.sameReference); // --> false
console.log(output.original === output.copy); // --> false
```

Si cambias `output.copy.count`, `item.count` sigue siendo `1` porque `copy` es un objeto distinto.

## 📎 Ejemplo (número — paso por valor):

```ts
let output = comparePassByValueAndReference(5);
console.log(output.original); // --> 5
console.log(output.copy); // --> 5
console.log(output.sameReference); // --> true
```

## 💡 Pistas:

+ Para objetos: `const copy = { ...input }` crea un objeto nuevo (`sameReference` es `false`).
+ Para primitivos (números, strings, booleanos): asignar `copy = input` copia el valor (`sameReference` es `true`).
+ Usa `input === copy` para comprobar si ambas variables referencian lo mismo.
