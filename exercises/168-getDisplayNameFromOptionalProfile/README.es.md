# `168` getDisplayNameFromOptionalProfile

## 📝 Instrucciones:

1. Escribe una función llamada `getDisplayName`. Dado un objeto `Profile`, `getDisplayName` devuelve el nombre a mostrar:

   - Si se proporciona `nickname`, devuelve el apodo.
   - De lo contrario, devuelve `firstName`.

2. Usa la interfaz `Profile` ya definida en `app.ts` (ten en cuenta que `nickname` es opcional).

## 📎 Ejemplo:

```ts
let output = getDisplayName({ firstName: 'Ana', nickname: 'Annie' });
console.log(output); // --> 'Annie'
```

```ts
let output = getDisplayName({ firstName: 'Ana' });
console.log(output); // --> 'Ana'
```

## 💡 Pistas:

+ Una propiedad opcional puede no estar presente en el objeto.
+ Puedes usar `profile.nickname ?? profile.firstName` o un `if`.
