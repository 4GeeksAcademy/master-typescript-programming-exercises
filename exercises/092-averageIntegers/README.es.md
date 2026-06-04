# `092` averageIntegers

## 📝 Instrucciones:

Este ejercicio tiene **dos funciones**. Implementa ambas en `app.ts`.

### 1. `sum`

Escribe una función llamada `sum`. Dado un array de números, `sum` devuelve la suma de todos sus elementos.

### 2. `average`

Escribe una función llamada `average`. Dado un array de números, `average` devuelve su promedio (la suma dividida entre la cantidad de números).

**Importante:** `average` debe llamar a tu función `sum`. No vuelvas a calcular la suma dentro de `average`.

## 📎 Ejemplos:

**`sum`**

```ts
let total = sum([4, 5]);
console.log(total); // --> 9
```

```ts
let total = sum([4, 1, 12, 20, 1]);
console.log(total); // --> 38
```

**`average`**

```ts
let output = average([5, 8]);
console.log(output); // --> 6.5
```

```ts
let output = average([5, 15, 60, 2]);
console.log(output); // --> 20.5
```

## 💡 Pistas:

+ Ambas funciones reciben un array de números (`number[]`) y devuelven un `number`.
+ Reutiliza `sum` dentro de `average`: `sum(arr) / arr.length`.
+ No dejes ninguna de las dos funciones del esqueleto sin implementar.
