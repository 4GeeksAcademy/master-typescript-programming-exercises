# `148` getAllButLastElementOfProperty

## 📝 Instrucciones:

1. Escribe una función llamada `getAllButLastElementOfProperty`. Dados un objeto y una key `getAllButLastElementOfProperty` retorna un array que contenga todos menos el último elemento del array ubicado en la key dada.

## 📎 Ejemplo:

```Js
let obj = {
  key: [1, 2, 3]
};
let output = getAllButLastElementOfProperty(obj, 'key');
console.log(output); // --> [1, 2]
```

## 💡 Pistas:

+ Si el array está vacío, debería retornar un array vacío `[]`.

+ Si la propiedad en la key dada no es un array, debería retornar un array vacío `[]`.

+ Si no hay ninguna propiedad en la key, debería retornar un array vacío `[]`.

