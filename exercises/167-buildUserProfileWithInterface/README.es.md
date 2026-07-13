# `167` buildUserProfileWithInterface

## 📝 Instrucciones:

1. Escribe una función llamada `buildUserProfile`. Dado el `name` y la `age` de un usuario, `buildUserProfile` devuelve un objeto `UserProfile` con estas propiedades:

   - `name`: el nombre dado
   - `age`: la edad dada
   - `isAdult`: `true` si la edad es 18 o mayor, de lo contrario `false`

2. Usa la interfaz `UserProfile` ya definida en `app.ts`.

## 📎 Ejemplo:

```ts
let output = buildUserProfile('Leo', 20);
console.log(output); // --> { name: 'Leo', age: 20, isAdult: true }
```

```ts
let output = buildUserProfile('Mia', 15);
console.log(output); // --> { name: 'Mia', age: 15, isAdult: false }
```

## 💡 Pistas:

+ Devuelve un nuevo objeto que cumpla con la interfaz `UserProfile`.
+ `isAdult` se puede calcular con `age >= 18`.
