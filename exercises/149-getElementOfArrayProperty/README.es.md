# `149` getElementOfArrayProperty

## 📝 Instrucciones:

1. Escribe una función llamada `getElementOfArrayProperty`. Dados un objeto, una key y un index numérico, `getElementOfArrayProperty` retorna el valor de un elemento en el index proporcionado del array ubicado dentro del objeto en la key dada.

## 📎 Ejemplo:

```Js
let obj = {
 key: ['Jamil', 'Albrey']
};
let output = getElementOfArrayProperty(obj, 'key', 0); 
console.log(output); // --> 'Jamil'
```

## 💡 Pistas:

+ Si el array está vacío, debería retornar `undefined`.

+ Si el index otorgado está fuera del rango del array localizado en la key, debería retornar `undefined`.

+ Si la propiedad en la key dada no es un array, debería retornar `undefined`.

+ Si no hay ninguna propiedad en la key, debería retornar `undefined`.

