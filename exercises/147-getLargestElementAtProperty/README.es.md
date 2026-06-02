# `147` getLargestElementAtProperty

## 📝 Instrucciones:

1. Escribe una función llamada `getLargestElementAtProperty`. Dados un objeto y una key, `getLargestElementAtProperty` retorna el elemento más grande en el array ubicado en dicha key.

## 📎 Ejemplo:

```Js
let obj = {
  key: [1, 2, 4]
};
let output = getLargestElementAtProperty(obj, 'key');
console.log(output); // --> 4
```

## 💡 Pistas:

+ Si el array está vacío, debería retornar un array vacío `[]`.

+ Si la propiedad en la key dada no es un array, debería retornar un array vacío `[]`.

+ Si no hay ninguna propiedad en la key, debería retornar un array vacío `[]`.

