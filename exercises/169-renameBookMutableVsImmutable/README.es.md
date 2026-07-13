# `169` renameBookMutableVsImmutable

## 📝 Instrucciones:

1. Escribe una función llamada `renameBookImmutable`. Dado un objeto `Book` y un `newTitle`, `renameBookImmutable` devuelve un **nuevo** objeto libro con el título actualizado.

2. El libro **original** no debe modificarse.

3. Usa la interfaz `Book` ya definida en `app.ts`.

## 📎 Ejemplo:

```ts
let book = { title: 'Old', author: 'A' };
let renamed = renameBookImmutable(book, 'New');
console.log(book.title); // --> 'Old'
console.log(renamed); // --> { title: 'New', author: 'A' }
```

## 💡 Pistas:

+ Usa el operador spread `{ ...book, title: newTitle }` para crear una copia superficial con una propiedad cambiada.
+ No asignes directamente a `book.title` dentro de la función.
