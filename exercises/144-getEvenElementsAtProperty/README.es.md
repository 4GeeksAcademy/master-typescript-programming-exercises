# `144` getEvenElementsAtProperty

## 📝 Instrucciones:

1. Escribe una función llamada `getEvenElementsAtProperty`. Dados un objeto y una key, `getEvenElementsAtProperty` retorna un array que contenga todos los elementos pares del array localizados en la key dada.

## 📎 Ejemplo:

```js
let obj = {
  key: [1000, 11, 50, 17]
};
let output = getEvenElementsAtProperty(obj, 'key');
console.log(output); // --> [1000, 50]
```

## 💡 Pistas:

* Si el array está vacío, debe retornar un array vacío `[]`.

* Si el array no contiene elementos pares, debe retornar un array vacío `[]`.

* Si la propiedad en la key dada no es un array, debe retornar un array vacío `[]`.

* Si no hay propiedad en la key dada, debe retornar un array vacío `[]`.

